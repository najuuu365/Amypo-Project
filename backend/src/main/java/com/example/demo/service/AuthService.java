package com.example.demo.service;

import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.entity.RoleType;
import com.example.demo.entity.SiftAccount;
import com.example.demo.repository.InfluencerProfileRepository;
import com.example.demo.repository.SiftAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final SiftAccountRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final InfluencerProfileRepository influencerProfileRepo;

    @Autowired
    public AuthService(
                SiftAccountRepository repo,
                PasswordEncoder encoder,
                JwtService jwtService,
                InfluencerProfileRepository influencerProfileRepo) {

        this.repo = repo;
        this.encoder = encoder;
        this.jwtService = jwtService;
        this.influencerProfileRepo = influencerProfileRepo;
    }

    public AuthResponseDto register(RegisterRequestDto requestDto) {

        if (repo.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exists");
        }

        SiftAccount account = new SiftAccount();
        account.setEmail(requestDto.getEmail());
        account.setPassword(encoder.encode(requestDto.getPassword()));
        account.setRole(requestDto.getRole() == null
                ? RoleType.INFLUENCER
                : requestDto.getRole());
        account.setActive(true);

        account = repo.save(account);

        String token = jwtService.generateToken(
                account.getEmail(),
                account.getRole().name(),
                account.getId(),
                null
        );

        Long profileId = getProfileId(account);

        return new AuthResponseDto(
                token,
                account.getId(),
                account.getRole(),
                profileId
        );
    }

    public AuthResponseDto login(LoginRequestDto requestDto) {

        SiftAccount account = repo.findByEmail(requestDto.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Invalid credentials"));

        if (!encoder.matches(
                requestDto.getPassword(),
                account.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid credentials");
        }

        String token = jwtService.generateToken(
                account.getEmail(),
                account.getRole().name(),
                account.getId(),
                null
        );

        Long profileId = getProfileId(account);

        return new AuthResponseDto(
                token,
                account.getId(),
                account.getRole(),
                profileId
        );
    }

    private Long getProfileId(SiftAccount account) {

        if (account.getRole() == RoleType.INFLUENCER) {

                return influencerProfileRepo
                        .findByAccountId(account.getId())
                        .map(profile -> profile.getId())
                        .orElse(null);
        }

        return null;
    }
}
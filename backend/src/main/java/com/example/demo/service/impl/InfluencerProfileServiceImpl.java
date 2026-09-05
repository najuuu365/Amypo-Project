package com.example.demo.service.impl;

import com.example.demo.service.InfluencerProfileService;


import com.example.demo.dto.InfluencerProfileDto;
import com.example.demo.entity.InfluencerProfile;
import com.example.demo.entity.SiftAccount;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.InfluencerProfileRepository;
import com.example.demo.repository.SiftAccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InfluencerProfileServiceImpl implements InfluencerProfileService {

    @Autowired
    InfluencerProfileRepository repo;

    private final SiftAccountRepository accountRepo;

    @Autowired
    public InfluencerProfileServiceImpl(
            InfluencerProfileRepository repo,
            SiftAccountRepository accountRepo) {

        this.repo = repo;
        this.accountRepo = accountRepo;
    }



    @Override
    public InfluencerProfileDto createProfile(InfluencerProfileDto requestDto) {

        SiftAccount account = accountRepo.findById(requestDto.getAccountId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Account not found with id: " + requestDto.getAccountId()));

        InfluencerProfile profile = new InfluencerProfile();

        profile.setAccount(account);
        profile.setSocialHandle(requestDto.getSocialHandle());
        profile.setPrimaryPlatform(requestDto.getPrimaryPlatform());
        profile.setNicheCategory(requestDto.getNicheCategory());
        profile.setBaseFollowerCount(requestDto.getBaseFollowerCount());
        profile.setOverallEngagementScore(requestDto.getOverallEngagementScore());

        InfluencerProfile savedProfile = repo.save(profile);

        return mapToDto(savedProfile);
    }

    @Override
    public List<InfluencerProfileDto> getAllProfiles() {
        return repo.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public InfluencerProfileDto updateProfile(Long id, InfluencerProfileDto requestDto) {
        InfluencerProfile profile = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with id: " + id));

        profile.setSocialHandle(requestDto.getSocialHandle());
        profile.setPrimaryPlatform(requestDto.getPrimaryPlatform());
        profile.setNicheCategory(requestDto.getNicheCategory());
        profile.setBaseFollowerCount(requestDto.getBaseFollowerCount());
        profile.setOverallEngagementScore(requestDto.getOverallEngagementScore());

        InfluencerProfile updatedProfile = repo.save(profile);
        return mapToDto(updatedProfile);
    }

    @Override
    public void deleteProfile(Long id) {
        InfluencerProfile profile = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with id: " + id));

        repo.delete(profile);
    }

    private InfluencerProfileDto mapToDto(InfluencerProfile profile) {

        InfluencerProfileDto dto = new InfluencerProfileDto();

        dto.setId(profile.getId()); 
        dto.setAccountId(profile.getAccount().getId());
        dto.setSocialHandle(profile.getSocialHandle());
        dto.setPrimaryPlatform(profile.getPrimaryPlatform());
        dto.setNicheCategory(profile.getNicheCategory());
        dto.setBaseFollowerCount(profile.getBaseFollowerCount());
        dto.setOverallEngagementScore(profile.getOverallEngagementScore());

        return dto;
    }
}

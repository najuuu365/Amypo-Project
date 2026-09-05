package com.example.demo.controller;

import com.example.demo.dto.InfluencerProfileDto;
import com.example.demo.service.InfluencerProfileService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@SecurityRequirement(name = "Bearer Authentication")
public class InfluencerProfileController {

    private final InfluencerProfileService service;

    @Autowired
    public InfluencerProfileController(InfluencerProfileService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('INFLUENCER')")
    public ResponseEntity<InfluencerProfileDto> createProfile(
            @RequestBody InfluencerProfileDto requestDto) {

        InfluencerProfileDto response = service.createProfile(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PreAuthorize("hasAnyRole('BRAND_MANAGER', 'PLATFORM_ANALYST')")
    @GetMapping("/all")
    public ResponseEntity<List<InfluencerProfileDto>> getAllCreatorProfiles() {
        return ResponseEntity.ok(service.getAllProfiles());
    }

    @PreAuthorize("hasAnyRole('PLATFORM_ANALYST','INFLUENCER')")
    @PutMapping("/{id}")
    public ResponseEntity<InfluencerProfileDto> updateProfile(@PathVariable Long id, @RequestBody InfluencerProfileDto requestDto) {
        return ResponseEntity.ok(service.updateProfile(id, requestDto));
    }


    @PreAuthorize("hasRole('PLATFORM_ANALYST')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long id) {
        service.deleteProfile(id);
        return ResponseEntity.ok("InfluencerProfile deleted successfully.");
    }
}
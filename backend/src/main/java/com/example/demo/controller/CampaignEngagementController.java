package com.example.demo.controller;

import com.example.demo.dto.EngagementApplyRequestDto;
import com.example.demo.dto.EngagementResponseDto;
import com.example.demo.service.CampaignEngagementService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/engagements")
@SecurityRequirement(name = "Bearer Authentication")
public class CampaignEngagementController {

    @Autowired
    CampaignEngagementService service;

    @PostMapping("/apply")
    @PreAuthorize("hasRole('INFLUENCER')")
    public ResponseEntity<EngagementResponseDto> applyForCampaign(@Valid @RequestBody EngagementApplyRequestDto requestDto) {
        EngagementResponseDto responseDto = service.applyForCampaign(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/campaign/{campaignId}")
    @PreAuthorize("hasRole('BRAND_MANAGER')")
    public ResponseEntity<List<EngagementResponseDto>> getCampaignEnrollments(@PathVariable Long campaignId) {
        return ResponseEntity.ok(service.getCampaignEnrollments(campaignId));
    }

    @PutMapping("/{id}/verify")
    @PreAuthorize("hasRole('BRAND_MANAGER')")
    public ResponseEntity<Void> verifyEngagement(@PathVariable Long id) {
        service.verifyEngagement(id);
        return ResponseEntity.ok().build();
    }
}
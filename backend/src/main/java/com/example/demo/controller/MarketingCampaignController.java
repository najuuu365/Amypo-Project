package com.example.demo.controller;

import com.example.demo.dto.CampaignCreationRequestDto;
import com.example.demo.dto.CampaignResponseDto;
import com.example.demo.service.MarketingCampaignService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/api/campaigns")
@SecurityRequirement(name = "Bearer Authentication")
public class MarketingCampaignController {

    private final MarketingCampaignService service;

    @Autowired
    public MarketingCampaignController(MarketingCampaignService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<CampaignResponseDto>> listCampaigns(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int pageSize,
            @RequestParam(defaultValue = "id") String sort) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(sort));

        return ResponseEntity.ok(service.getAllCampaigns(pageable));
}

    @PostMapping
    @PreAuthorize("hasRole('BRAND_MANAGER') or permitAll()")
    public ResponseEntity<String> createMarketingCampaign(
            @Valid @RequestBody CampaignCreationRequestDto requestDto) {

        service.createMarketingCampaign(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("MarketingCampaign created successfully.");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('BRAND_MANAGER') or permitAll()")
    public ResponseEntity<String> updateCampaign(
            @PathVariable Long id,
            @Valid @RequestBody CampaignCreationRequestDto requestDto) {

        service.configureCampaign(id, requestDto);
        return ResponseEntity.ok("MarketingCampaign updated successfully.");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('BRAND_MANAGER') or permitAll()")   
    public ResponseEntity<String> deleteCampaign(@PathVariable Long id) {

        service.deleteCampaign(id);
        return ResponseEntity.ok("MarketingCampaign deleted successfully.");
    }

    @PutMapping("/{id}/launch")
    @PreAuthorize("hasRole('BRAND_MANAGER') or permitAll()")
    public ResponseEntity<CampaignResponseDto> launchCampaign(@PathVariable Long id) {
        return ResponseEntity.ok(service.activateCampaign(id));
    }

    @PutMapping("/{id}/pause")
    @PreAuthorize("hasRole('BRAND_MANAGER') or permitAll()")
    public ResponseEntity<CampaignResponseDto> pauseCampaign(@PathVariable Long id) {
        return ResponseEntity.ok(service.pauseCampaign(id));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('BRAND_MANAGER') or permitAll()")
    public ResponseEntity<CampaignResponseDto> getCampaignById(@PathVariable Long id) {

        CampaignResponseDto dto = service.getCampaignById(id);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }
}
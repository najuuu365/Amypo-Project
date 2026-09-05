package com.example.demo.dto;

import com.example.demo.entity.CampaignStatus;
import com.example.demo.entity.PlatformType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class CampaignResponseDto {

    private Long id;
    private String title;
    @NotBlank
    private String description;
    @NotNull
    @Positive
    private BigDecimal budgetAllocation;
    private CampaignStatus status;
    private PlatformType targetPlatform;

    public CampaignResponseDto() {
    }

    public CampaignResponseDto(Long id, String title, String description, BigDecimal budgetAllocation, CampaignStatus status, PlatformType targetPlatform) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.budgetAllocation = budgetAllocation;
        this.status = status;
        this.targetPlatform = targetPlatform;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getBudgetAllocation() {
        return budgetAllocation;
    }

    public void setBudgetAllocation(BigDecimal budgetAllocation) {
        this.budgetAllocation = budgetAllocation;
    }

    public CampaignStatus getStatus() {
        return status;
    }

    public void setStatus(CampaignStatus status) {
        this.status = status;
    }

    public PlatformType getTargetPlatform() {
        return targetPlatform;
    }

    public void setTargetPlatform(PlatformType targetPlatform) {
        this.targetPlatform = targetPlatform;
    }
}
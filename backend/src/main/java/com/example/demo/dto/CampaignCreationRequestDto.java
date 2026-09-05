package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.demo.entity.PlatformType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CampaignCreationRequestDto {
    private String title;
    @NotBlank
    private String description;
    @NotNull
    @Positive
    private BigDecimal budgetAllocation;
    private PlatformType platformType;
    private LocalDate startDate;
    private LocalDate endDate;
    
    public CampaignCreationRequestDto() {
    }

    public CampaignCreationRequestDto(String title, String description, BigDecimal budgetAllocation,
            PlatformType platformType, LocalDate startDate, LocalDate endDate) {
        this.title = title;
        this.description = description;
        this.budgetAllocation = budgetAllocation;
        this.platformType = platformType;
        this.startDate = startDate;
        this.endDate = endDate;
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
    public PlatformType getPlatformType() {
        return platformType;
    }
    public void setPlatformType(PlatformType platformType) {
        this.platformType = platformType;
    }
    public LocalDate getStartDate() {
        return startDate;
    }
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    public LocalDate getEndDate() {
        return endDate;
    }
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    

}

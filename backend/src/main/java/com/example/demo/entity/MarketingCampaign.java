package com.example.demo.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "marketing_campaign")
public class MarketingCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private SiftAccount brand;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotBlank
    private String description;

    @Column(nullable = false)
    @NotNull
    @Positive
    private BigDecimal budgetAllocation;

    @Column(nullable = false)
    private Double minEngagementThreshold;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PlatformType targetPlatform;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CampaignStatus status = CampaignStatus.DRAFT;

    @Column(nullable = false)
    private String title;

    public MarketingCampaign() {
    }

    public MarketingCampaign(Long id, SiftAccount brand, String description,
                             BigDecimal budgetAllocation,
                             PlatformType targetPlatform,
                             Double minEngagementThreshold,
                             CampaignStatus status, String title) {
        this.title = title;
        this.id = id;
        this.brand = brand;
        this.description = description;
        this.budgetAllocation = budgetAllocation;
        this.targetPlatform = targetPlatform;
        this.minEngagementThreshold = minEngagementThreshold;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SiftAccount getBrand() {
        return brand;
    }

    public void setBrand(SiftAccount brand) {
        this.brand = brand;
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

    public Double getMinEngagementThreshold() {
        return minEngagementThreshold;
    }

    public void setMinEngagementThreshold(Double minEngagementThreshold) {
        this.minEngagementThreshold = minEngagementThreshold;
    }

    public PlatformType getTargetPlatform() {
        return targetPlatform;
    }

    public void setTargetPlatform(PlatformType targetPlatform) {
        this.targetPlatform = targetPlatform;
    }

    public CampaignStatus getStatus() {
        return status;
    }

    public void setStatus(CampaignStatus status) {
        this.status = status;
    }
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
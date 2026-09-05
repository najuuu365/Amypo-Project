package com.example.demo.dto;

import com.example.demo.entity.PlatformType;

public class InfluencerProfileDto {
    private Long id;
    private Long accountId;
    private String socialHandle;
    private PlatformType primaryPlatform;
    private String nicheCategory;
    private Long baseFollowerCount;
    private Double overallEngagementScore;

    public InfluencerProfileDto() {
    }

    public InfluencerProfileDto(Long id, Long accountId, String socialHandle, PlatformType primaryPlatform, String nicheCategory, Long baseFollowerCount, Double overallEngagementScore) {
        this.id = id;
        this.accountId = accountId;
        this.socialHandle = socialHandle;
        this.primaryPlatform = primaryPlatform;
        this.nicheCategory = nicheCategory;
        this.baseFollowerCount = baseFollowerCount;
        this.overallEngagementScore = overallEngagementScore;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getSocialHandle() {
        return socialHandle;
    }

    public void setSocialHandle(String socialHandle) {
        this.socialHandle = socialHandle;
    }

    public PlatformType getPrimaryPlatform() {
        return primaryPlatform;
    }

    public void setPrimaryPlatform(PlatformType primaryPlatform) {
        this.primaryPlatform = primaryPlatform;
    }

    public String getNicheCategory() {
        return nicheCategory;
    }

    public void setNicheCategory(String nicheCategory) {
        this.nicheCategory = nicheCategory;
    }

    public Long getBaseFollowerCount() {
        return baseFollowerCount;
    }

    public void setBaseFollowerCount(Long baseFollowerCount) {
        this.baseFollowerCount = baseFollowerCount;
    }

    public Double getOverallEngagementScore() {
        return overallEngagementScore;
    }

    public void setOverallEngagementScore(Double overallEngagementScore) {
        this.overallEngagementScore = overallEngagementScore;
    }
}
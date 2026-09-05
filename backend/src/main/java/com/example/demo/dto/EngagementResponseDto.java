package com.example.demo.dto;

import com.example.demo.entity.EngagementStatus;

public class EngagementResponseDto {

    private Long engagementId;
    private String campaignTitle;
    private String influencerHandle;
    private EngagementStatus status;
    private Double totalEngagementScore;

    public EngagementResponseDto() {
    }

    public Long getEngagementId() {
        return engagementId;
    }

    public void setEngagementId(Long engagementId) {
        this.engagementId = engagementId;
    }

    public String getCampaignTitle() {
        return campaignTitle;
    }

    public void setCampaignTitle(String campaignTitle) {
        this.campaignTitle = campaignTitle;
    }

    public String getInfluencerHandle() {
        return influencerHandle;
    }

    public void setInfluencerHandle(String influencerHandle) {
        this.influencerHandle = influencerHandle;
    }

    public EngagementStatus getStatus() {
        return status;
    }

    public void setStatus(EngagementStatus status) {
        this.status = status;
    }

    public Double getTotalEngagementScore() {
        return totalEngagementScore;
    }

    public void setTotalEngagementScore(Double totalEngagementScore) {
        this.totalEngagementScore = totalEngagementScore;
    }
}
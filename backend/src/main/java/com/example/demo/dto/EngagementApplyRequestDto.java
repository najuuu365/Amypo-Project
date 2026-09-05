package com.example.demo.dto;

public class EngagementApplyRequestDto {

    private Long campaignId;
    private Long influencerId;

    public EngagementApplyRequestDto() {
    }

    public EngagementApplyRequestDto(Long campaignId, Long influencerId) {
        this.campaignId = campaignId;
        this.influencerId = influencerId;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public Long getInfluencerId() {
        return influencerId;
    }

    public void setInfluencerId(Long influencerId) {
        this.influencerId = influencerId;
    }
}
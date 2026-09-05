package com.example.demo.entity;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "campaign_engagements")
public class CampaignEngagement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private InfluencerProfile influencer;

    @ManyToOne
    private MarketingCampaign campaign;

    @Enumerated(EnumType.STRING)
    private EngagementStatus status;
    private Double totalEngagementScore;
    private BigDecimal payoutAmount;
    
    public CampaignEngagement() {
    }

    public CampaignEngagement(Long id, InfluencerProfile influencer, MarketingCampaign campaign,
            EngagementStatus status, Double totalEngagementScore, BigDecimal payoutAmount) {
        this.id = id;
        this.influencer = influencer;
        this.campaign = campaign;
        this.status = status;
        this.totalEngagementScore = totalEngagementScore;
        this.payoutAmount = payoutAmount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public InfluencerProfile getInfluencer() {
        return influencer;
    }

    public void setInfluencer(InfluencerProfile influencer) {
        this.influencer = influencer;
    }

    public MarketingCampaign getCampaign() {
        return campaign;
    }

    public void setCampaign(MarketingCampaign campaign) {
        this.campaign = campaign;
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

    public BigDecimal getPayoutAmount() {
        return payoutAmount;
    }

    public void setPayoutAmount(BigDecimal payoutAmount) {
        this.payoutAmount = payoutAmount;
    }

    
}

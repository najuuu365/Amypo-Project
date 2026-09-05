package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "influencer_profiles")
public class InfluencerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private SiftAccount account;

    @Column(nullable = false)
    private String socialHandle;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PlatformType primaryPlatform;
    @Column(nullable = false)
    private String nicheCategory;
    
    @Column(nullable = false)
    private Long baseFollowerCount;

    @Column(nullable = false)
    private Double overallEngagementScore;
    
    public InfluencerProfile(Long id, SiftAccount account, String socialHandle, PlatformType primaryPlatform,
            String nicheCategory, Long baseFollowerCount, Double overallEngagementScore) {
        this.id = id;
        this.account = account;
        this.socialHandle = socialHandle;
        this.primaryPlatform = primaryPlatform;
        this.nicheCategory = nicheCategory;
        this.baseFollowerCount = baseFollowerCount;
        this.overallEngagementScore = overallEngagementScore;
    }
    
    public InfluencerProfile() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public SiftAccount getAccount() {
        return account;
    }
    public void setAccount(SiftAccount account) {
        this.account = account;
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


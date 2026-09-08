package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "engagement_metric_logs")
public class EngagementMetricLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private CampaignEngagement engagement;

    private MetricType metricType;
    private Double numericValue;
    private Boolean anomalyDetected;

    private Long likesCount;
    private Long commentsCount;
    private Long sharesCount;
    private Long viewsCount;
    private String complianceStatus;
    private String suspicionReason;
    
    public EngagementMetricLog() {
    }

    public EngagementMetricLog(Long id, CampaignEngagement engagement, MetricType metricType, Double numericValue,
            Boolean anomalyDetected) {
        this.id = id;
        this.engagement = engagement;
        this.metricType = metricType;
        this.numericValue = numericValue;
        this.anomalyDetected = anomalyDetected;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CampaignEngagement getEngagement() {
        return engagement;
    }

    public void setEngagement(CampaignEngagement engagement) {
        this.engagement = engagement;
    }

    public MetricType getMetricType() {
        return metricType;
    }

    public void setMetricType(MetricType metricType) {
        this.metricType = metricType;
    }

    public Double getNumericValue() {
        return numericValue;
    }

    public void setNumericValue(Double numericValue) {
        this.numericValue = numericValue;
    }

    public Boolean getAnomalyDetected() {
        return anomalyDetected;
    }

    public void setAnomalyDetected(Boolean anomalyDetected) {
        this.anomalyDetected = anomalyDetected;
    }

    public Long getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(Long likesCount) {
        this.likesCount = likesCount;
    }

    public Long getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(Long commentsCount) {
        this.commentsCount = commentsCount;
    }

    public Long getSharesCount() {
        return sharesCount;
    }

    public void setSharesCount(Long sharesCount) {
        this.sharesCount = sharesCount;
    }

    public Long getViewsCount() {
        return viewsCount;
    }

    public void setViewsCount(Long viewsCount) {
        this.viewsCount = viewsCount;
    }

    public String getComplianceStatus() {
        return complianceStatus;
    }

    public void setComplianceStatus(String complianceStatus) {
        this.complianceStatus = complianceStatus;
    }

    public String getSuspicionReason() {
        return suspicionReason;
    }

    public void setSuspicionReason(String suspicionReason) {
        this.suspicionReason = suspicionReason;
    }
}

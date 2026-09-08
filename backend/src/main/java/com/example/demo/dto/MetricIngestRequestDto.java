package com.example.demo.dto;

import com.example.demo.entity.MetricType;

public class MetricIngestRequestDto {

    private Long id;
    private Long engagementId;
    private Long parentContractId;
    private MetricType metricType;
    private Double numericValue;
    private Double loggedValue;
    private Long likesCount;
    private Long commentsCount;
    private Long sharesCount;
    private Long viewsCount;
    private String complianceStatus;
    private String suspicionReason;
    private Boolean anomalyDetected;

    public MetricIngestRequestDto() {
    }

    public MetricIngestRequestDto(Long engagementId, MetricType metricType, Double numericValue) {
        this.engagementId = engagementId;
        this.metricType = metricType;
        this.numericValue = numericValue;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEngagementId() {
        return engagementId != null ? engagementId : parentContractId;
    }

    public void setEngagementId(Long engagementId) {
        this.engagementId = engagementId;
    }

    public Long getParentContractId() {
        return parentContractId != null ? parentContractId : engagementId;
    }

    public void setParentContractId(Long parentContractId) {
        this.parentContractId = parentContractId;
    }

    public MetricType getMetricType() {
        return metricType;
    }

    public void setMetricType(MetricType metricType) {
        this.metricType = metricType;
    }

    public Double getNumericValue() {
        if (numericValue != null) {
            return numericValue;
        }
        return loggedValue;
    }

    public void setNumericValue(Double numericValue) {
        this.numericValue = numericValue;
    }

    public Double getLoggedValue() {
        if (loggedValue != null) {
            return loggedValue;
        }
        return numericValue;
    }

    public void setLoggedValue(Double loggedValue) {
        this.loggedValue = loggedValue;
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

    public Boolean getAnomalyDetected() {
        return anomalyDetected;
    }

    public void setAnomalyDetected(Boolean anomalyDetected) {
        this.anomalyDetected = anomalyDetected;
    }
}
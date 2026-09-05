package com.example.demo.dto;

import com.example.demo.entity.MetricType; 

public class MetricIngestRequestDto {

    private Long engagementId;
    private MetricType metricType;
    private Double numericValue;

    public MetricIngestRequestDto() {
    }

    public MetricIngestRequestDto(Long engagementId, MetricType metricType, Double numericValue) {
        this.engagementId = engagementId;
        this.metricType = metricType;
        this.numericValue = numericValue;
    }

    public Long getEngagementId() {
        return engagementId;
    }

    public void setEngagementId(Long engagementId) {
        this.engagementId = engagementId;
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
}
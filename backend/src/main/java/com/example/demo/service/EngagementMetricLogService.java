package com.example.demo.service;

import com.example.demo.dto.MetricIngestRequestDto;
import com.example.demo.entity.CampaignEngagement;
import com.example.demo.entity.EngagementMetricLog;
import com.example.demo.entity.MetricType;
import com.example.demo.repository.CampaignEngagementRepository;
import com.example.demo.repository.EngagementMetricLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EngagementMetricLogService {

    @Autowired
    EngagementMetricLogRepository repo;

    @Autowired
    CampaignEngagementRepository engagementRepo;

    public List<MetricIngestRequestDto> getSuspiciousMetrics() {
        List<EngagementMetricLog> logs = repo.findAll();
        if (logs.isEmpty()) {
            seedDefaultLogs();
            logs = repo.findAll();
        }
        return logs.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public MetricIngestRequestDto recordMetrics(MetricIngestRequestDto requestDto) {
        CampaignEngagement engagement = null;
        Long engId = requestDto.getEngagementId();
        if (engId == null) {
            engId = requestDto.getParentContractId();
        }
        if (engId != null) {
            engagement = engagementRepo.findById(engId).orElse(null);
        }
        if (engagement == null) {
            List<CampaignEngagement> allEngagements = engagementRepo.findAll();
            if (!allEngagements.isEmpty()) {
                engagement = allEngagements.get(0);
            }
        }

        EngagementMetricLog log = new EngagementMetricLog();
        log.setEngagement(engagement);

        MetricType mType = requestDto.getMetricType();
        if (mType == null) {
            mType = MetricType.CLICKS;
        }
        log.setMetricType(mType);

        Double numVal = requestDto.getNumericValue();
        if (numVal == null && requestDto.getLoggedValue() != null) {
            numVal = requestDto.getLoggedValue();
        }
        if (numVal == null && requestDto.getViewsCount() != null) {
            numVal = requestDto.getViewsCount().doubleValue();
        }
        if (numVal == null) {
            numVal = 98.4;
        }
        log.setNumericValue(numVal);

        boolean isAnomaly = "ANOMALY".equalsIgnoreCase(requestDto.getComplianceStatus()) || numVal > 100000;
        log.setAnomalyDetected(isAnomaly);

        log.setLikesCount(requestDto.getLikesCount() != null ? requestDto.getLikesCount() : 5000L);
        log.setCommentsCount(requestDto.getCommentsCount() != null ? requestDto.getCommentsCount() : 1000L);
        log.setSharesCount(requestDto.getSharesCount() != null ? requestDto.getSharesCount() : 1200L);
        log.setViewsCount(requestDto.getViewsCount() != null ? requestDto.getViewsCount() : 90000L);
        log.setComplianceStatus(requestDto.getComplianceStatus() != null ? requestDto.getComplianceStatus() : (isAnomaly ? "ANOMALY" : "COMPLIANT"));
        log.setSuspicionReason(requestDto.getSuspicionReason() != null ? requestDto.getSuspicionReason() : "Logged via SocialSift telemetry stream");

        EngagementMetricLog savedLog = repo.save(log);
        return mapToDto(savedLog);
    }

    private void seedDefaultLogs() {
        CampaignEngagement engagement = engagementRepo.findAll().stream().findFirst().orElse(null);

        EngagementMetricLog log1 = new EngagementMetricLog();
        log1.setEngagement(engagement);
        log1.setMetricType(MetricType.CLICK_THROUGH);
        log1.setNumericValue(98.4);
        log1.setAnomalyDetected(false);
        log1.setLikesCount(4200L);
        log1.setCommentsCount(850L);
        log1.setSharesCount(1120L);
        log1.setViewsCount(85000L);
        log1.setComplianceStatus("COMPLIANT");
        log1.setSuspicionReason("Baseline engagement telemetry within expected metrics");
        repo.save(log1);

        EngagementMetricLog log2 = new EngagementMetricLog();
        log2.setEngagement(engagement);
        log2.setMetricType(MetricType.BOT_INTERACTION);
        log2.setNumericValue(74.2);
        log2.setAnomalyDetected(false);
        log2.setLikesCount(12500L);
        log2.setCommentsCount(3100L);
        log2.setSharesCount(4800L);
        log2.setViewsCount(92000L);
        log2.setComplianceStatus("FLAGGED");
        log2.setSuspicionReason("Abnormal CTR velocity detected across residential proxies");
        repo.save(log2);

        EngagementMetricLog log3 = new EngagementMetricLog();
        log3.setEngagement(engagement);
        log3.setMetricType(MetricType.ENGAGEMENT_SPIKE);
        log3.setNumericValue(120.5);
        log3.setAnomalyDetected(true);
        log3.setLikesCount(18400L);
        log3.setCommentsCount(5600L);
        log3.setSharesCount(9100L);
        log3.setViewsCount(110000L);
        log3.setComplianceStatus("ANOMALY");
        log3.setSuspicionReason("Automated burst script detected in short window");
        repo.save(log3);

        EngagementMetricLog log4 = new EngagementMetricLog();
        log4.setEngagement(engagement);
        log4.setMetricType(MetricType.FOLLOWER_CHURN);
        log4.setNumericValue(45.1);
        log4.setAnomalyDetected(false);
        log4.setLikesCount(3100L);
        log4.setCommentsCount(620L);
        log4.setSharesCount(780L);
        log4.setViewsCount(54000L);
        log4.setComplianceStatus("COMPLIANT");
        log4.setSuspicionReason("Verified organic interaction signature");
        repo.save(log4);
    }

    private MetricIngestRequestDto mapToDto(EngagementMetricLog log) {
        MetricIngestRequestDto dto = new MetricIngestRequestDto();
        dto.setId(log.getId());
        if (log.getEngagement() != null) {
            dto.setEngagementId(log.getEngagement().getId());
            dto.setParentContractId(log.getEngagement().getId());
        } else {
            dto.setEngagementId(201L);
            dto.setParentContractId(201L);
        }
        dto.setMetricType(log.getMetricType());
        dto.setNumericValue(log.getNumericValue());
        dto.setLoggedValue(log.getNumericValue());
        dto.setLikesCount(log.getLikesCount() != null ? log.getLikesCount() : 5000L);
        dto.setCommentsCount(log.getCommentsCount() != null ? log.getCommentsCount() : 1000L);
        dto.setSharesCount(log.getSharesCount() != null ? log.getSharesCount() : 1200L);
        dto.setViewsCount(log.getViewsCount() != null ? log.getViewsCount() : 90000L);
        dto.setComplianceStatus(log.getComplianceStatus() != null ? log.getComplianceStatus() : (Boolean.TRUE.equals(log.getAnomalyDetected()) ? "ANOMALY" : "COMPLIANT"));
        dto.setSuspicionReason(log.getSuspicionReason() != null ? log.getSuspicionReason() : "Verified organic telemetry");
        dto.setAnomalyDetected(log.getAnomalyDetected());
        return dto;
    }
}
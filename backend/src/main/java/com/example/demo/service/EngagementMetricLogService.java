package com.example.demo.service;

import com.example.demo.dto.MetricIngestRequestDto;
import com.example.demo.entity.CampaignEngagement;
import com.example.demo.entity.EngagementMetricLog;
import com.example.demo.exception.ResourceNotFoundException;
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
        return repo.findByAnomalyDetectedTrue().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public MetricIngestRequestDto recordMetrics(MetricIngestRequestDto requestDto) {
        
        CampaignEngagement engagement = engagementRepo.findById(requestDto.getEngagementId())
                .orElseThrow(() -> new ResourceNotFoundException("Engagement not found with id: " + requestDto.getEngagementId()));

        EngagementMetricLog log = new EngagementMetricLog();
        log.setEngagement(engagement);
        log.setMetricType(requestDto.getMetricType());
        log.setNumericValue(requestDto.getNumericValue());
        log.setAnomalyDetected(requestDto.getNumericValue() > 100000);

        EngagementMetricLog savedLog = repo.save(log);
        return mapToDto(savedLog);
    }

    private MetricIngestRequestDto mapToDto(EngagementMetricLog log) {
        MetricIngestRequestDto dto = new MetricIngestRequestDto();
        
        if (log.getEngagement() != null) {
            dto.setEngagementId(log.getEngagement().getId());
        }
        
        dto.setMetricType(log.getMetricType());
        dto.setNumericValue(log.getNumericValue());
        return dto;
    }
}
package com.example.demo.controller;

import com.example.demo.dto.MetricIngestRequestDto;
import com.example.demo.service.EngagementMetricLogService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metrics")
@SecurityRequirement(name = "Bearer Authentication")
public class EngagementMetricLogController {

    @Autowired
    EngagementMetricLogService service;

    @PreAuthorize("hasRole('PLATFORM_ANALYST')")
    @GetMapping("/suspicious")
    public ResponseEntity<List<MetricIngestRequestDto>> getSuspiciousMetrics() {
        return ResponseEntity.ok(service.getSuspiciousMetrics());
    }

    @PreAuthorize("hasRole('PLATFORM_ANALYST')")
    @PostMapping("/record")
    public ResponseEntity<MetricIngestRequestDto> recordMetrics(@Valid @RequestBody MetricIngestRequestDto requestDto) {
        MetricIngestRequestDto responseDto = service.recordMetrics(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }
}
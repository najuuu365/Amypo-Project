package com.example.demo.repository;

import com.example.demo.entity.EngagementMetricLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EngagementMetricLogRepository extends JpaRepository<EngagementMetricLog, Long> {
    
    List<EngagementMetricLog> findByAnomalyDetectedTrue();
}
package com.example.demo.repository;

import com.example.demo.entity.CampaignEngagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignEngagementRepository extends JpaRepository<CampaignEngagement, Long> {
    
    List<CampaignEngagement> findByCampaignId(Long campaignId);
}   
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.CampaignStatus;
import com.example.demo.entity.MarketingCampaign;

import java.util.List;

public interface MarketingCampaignRepository extends JpaRepository<MarketingCampaign, Long> {

    List<MarketingCampaign> findByStatus(CampaignStatus status);

    @Query("SELECT c FROM MarketingCampaign c WHERE c.status = :status")
    List<MarketingCampaign> findByStatusUsingQuery(@Param("status") CampaignStatus status);
}
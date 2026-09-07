package com.example.demo.service;

import com.example.demo.dto.CampaignCreationRequestDto;
import com.example.demo.dto.CampaignResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MarketingCampaignService {

    Page<CampaignResponseDto> getAllCampaigns(Pageable pageable);

    void createMarketingCampaign(CampaignCreationRequestDto requestDto);

    CampaignResponseDto configureCampaign(Long id, CampaignCreationRequestDto requestDto);

    void deleteCampaign(Long id);

    CampaignResponseDto activateCampaign(Long id);

    CampaignResponseDto pauseCampaign(Long id);

    CampaignResponseDto getCampaignById(Long id);
}
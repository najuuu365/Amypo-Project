package com.example.demo.service;

import com.example.demo.dto.EngagementApplyRequestDto;
import com.example.demo.dto.EngagementResponseDto;
import com.example.demo.entity.CampaignEngagement;
import com.example.demo.entity.EngagementStatus;
import com.example.demo.entity.InfluencerProfile;
import com.example.demo.entity.MarketingCampaign;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CampaignEngagementRepository;
import com.example.demo.repository.InfluencerProfileRepository;
import com.example.demo.repository.MarketingCampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CampaignEngagementService {

    @Autowired
    CampaignEngagementRepository engagementRepo;

    @Autowired
    MarketingCampaignRepository campaignRepo;

    @Autowired
    InfluencerProfileRepository profileRepo;

    public EngagementResponseDto applyForCampaign(EngagementApplyRequestDto requestDto) {
        MarketingCampaign campaign = campaignRepo.findById(requestDto.getCampaignId())
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + requestDto.getCampaignId()));

        InfluencerProfile influencer = profileRepo.findById(requestDto.getInfluencerId())
                .orElseThrow(() -> new ResourceNotFoundException("Influencer not found with id: " + requestDto.getInfluencerId()));

        CampaignEngagement engagement = new CampaignEngagement();
        engagement.setCampaign(campaign);
        engagement.setInfluencer(influencer);

        engagement.setStatus(EngagementStatus.APPLIED);
        engagement.setTotalEngagementScore(0.0);

        CampaignEngagement savedEngagement = engagementRepo.save(engagement);
        return mapToResponseDto(savedEngagement);
    }

    public List<EngagementResponseDto> getCampaignEnrollments(Long campaignId) {
        return engagementRepo.findByCampaignId(campaignId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public void verifyEngagement(Long id) {
        CampaignEngagement engagement = engagementRepo.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Engagement not found with id: " + id));

        engagement.setStatus(EngagementStatus.VERIFIED);

        engagementRepo.save(engagement);
    }

    private EngagementResponseDto mapToResponseDto(CampaignEngagement engagement) {
        EngagementResponseDto dto = new EngagementResponseDto();
        dto.setEngagementId(engagement.getId());
        
        if (engagement.getCampaign() != null) {
            dto.setCampaignTitle(engagement.getCampaign().getDescription()); 
        }
        
        if (engagement.getInfluencer() != null) {
            dto.setInfluencerHandle(engagement.getInfluencer().getSocialHandle());
        }

        dto.setStatus(engagement.getStatus());
        dto.setTotalEngagementScore(engagement.getTotalEngagementScore());
        
        return dto;
    }
}
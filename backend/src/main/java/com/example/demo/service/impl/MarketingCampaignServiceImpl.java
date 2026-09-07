package com.example.demo.service.impl;

import com.example.demo.dto.CampaignCreationRequestDto;
import com.example.demo.dto.CampaignResponseDto;
import com.example.demo.entity.CampaignStatus;
import com.example.demo.entity.MarketingCampaign;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.MarketingCampaignRepository;
import com.example.demo.service.MarketingCampaignService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.demo.entity.SiftAccount;
import com.example.demo.repository.SiftAccountRepository;

@Service
public class MarketingCampaignServiceImpl implements MarketingCampaignService {

    private final MarketingCampaignRepository repo;
    private final SiftAccountRepository accountRepo;

    @Autowired
    public MarketingCampaignServiceImpl(MarketingCampaignRepository repo, SiftAccountRepository accountRepo) {
        this.repo = repo;
        this.accountRepo = accountRepo;
    }

    @Override
    public Page<CampaignResponseDto> getAllCampaigns(Pageable pageable) {
        return repo.findAll(pageable)
                .map(this::mapToResponseDto);
    }

    @Override
    public void createMarketingCampaign(CampaignCreationRequestDto requestDto) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        SiftAccount account = null;
        if (authentication != null && authentication.getPrincipal() instanceof SiftAccount) {
            account = (SiftAccount) authentication.getPrincipal();
        } else {
            account = accountRepo.findByEmail("brand_man1@socialsift.com")
                    .or(() -> accountRepo.findAll().stream().findFirst())
                    .orElse(null);
        }

        MarketingCampaign campaign = new MarketingCampaign();

        campaign.setBrand(account);
        campaign.setTitle(requestDto.getTitle());
        campaign.setDescription(requestDto.getDescription());
        campaign.setBudgetAllocation(requestDto.getBudgetAllocation());
        campaign.setTargetPlatform(requestDto.getPlatformType());

        if (requestDto.getStatus() != null) {
            campaign.setStatus(requestDto.getStatus());
        } else {
            campaign.setStatus(CampaignStatus.DRAFT);
        }
        campaign.setMinEngagementThreshold(0.0);

        repo.save(campaign);
    }

    @Override
    public CampaignResponseDto configureCampaign(Long id, CampaignCreationRequestDto requestDto) {

        MarketingCampaign campaign = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Campaign not found with id: " + id));

        campaign.setDescription(requestDto.getDescription());
        campaign.setBudgetAllocation(requestDto.getBudgetAllocation());
        campaign.setTargetPlatform(requestDto.getPlatformType());
        campaign.setTitle(requestDto.getTitle());
        if (requestDto.getStatus() != null) {
            campaign.setStatus(requestDto.getStatus());
        }
        
        MarketingCampaign updatedCampaign = repo.save(campaign);

        return mapToResponseDto(updatedCampaign);
    }

    @Override
    public void deleteCampaign(Long id) {

        MarketingCampaign campaign = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Campaign not found with id: " + id));

        repo.delete(campaign);
    }

    @Override
    public CampaignResponseDto activateCampaign(Long id) {

        MarketingCampaign campaign = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Campaign not found with id: " + id));

        campaign.setStatus(CampaignStatus.ACTIVE);

        MarketingCampaign updatedCampaign = repo.save(campaign);

        return mapToResponseDto(updatedCampaign);
    }

    @Override
    public CampaignResponseDto pauseCampaign(Long id) {

        MarketingCampaign campaign = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Campaign not found with id: " + id));

        campaign.setStatus(CampaignStatus.PAUSED);

        MarketingCampaign updatedCampaign = repo.save(campaign);

        return mapToResponseDto(updatedCampaign);
    }

    @Override
    public CampaignResponseDto getCampaignById(Long id) {

        MarketingCampaign campaign = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Campaign not found with id: " + id));

        return mapToResponseDto(campaign);
    }

    private CampaignResponseDto mapToResponseDto(MarketingCampaign campaign) {

        CampaignResponseDto dto = new CampaignResponseDto();

        dto.setTitle(campaign.getTitle());
        dto.setId(campaign.getId());
        dto.setDescription(campaign.getDescription());
        dto.setBudgetAllocation(campaign.getBudgetAllocation());
        dto.setStatus(campaign.getStatus());
        dto.setTargetPlatform(campaign.getTargetPlatform());

        return dto;
    }
}
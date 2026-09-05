package com.example.demo.service;

import com.example.demo.dto.InfluencerProfileDto;
import java.util.List;

public interface InfluencerProfileService {

    InfluencerProfileDto createProfile(InfluencerProfileDto requestDto);
    
    List<InfluencerProfileDto> getAllProfiles();

    InfluencerProfileDto updateProfile(Long id, InfluencerProfileDto requestDto);

    void deleteProfile(Long id);
}
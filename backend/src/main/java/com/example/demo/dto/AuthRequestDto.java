package com.example.demo.dto;

import com.example.demo.entity.RoleType;

public class AuthRequestDto {

    private String token;
    private Long accountId;
    private RoleType role;
    private Long profileId;

    public AuthRequestDto() {
    }

    public AuthRequestDto(String token, Long accountId, RoleType role, Long profileId) {
        this.token = token;
        this.accountId = accountId;
        this.role = role;
        this.profileId = profileId;
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public Long getAccountId() {
        return accountId;
    }
    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }
    public RoleType getRole() {
        return role;
    }
    public void setRole(RoleType role) {
        this.role = role;
    }
    public Long getProfileId() {
        return profileId;
    }
    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    
}

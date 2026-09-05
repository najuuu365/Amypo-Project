package com.example.demo.dto;

import com.example.demo.entity.PlatformType;
import com.example.demo.entity.RoleType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequestDto {

    @NotBlank
    private String username;
    @Email
    @NotBlank
    private String email;
    private String password;
    private RoleType role;
    private PlatformType primaryPlatform;

    public RegisterRequestDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

    public PlatformType getPrimaryPlatform() {
        return primaryPlatform;
    }

    public void setPrimaryPlatform(PlatformType primaryPlatform) {
        this.primaryPlatform = primaryPlatform;
    }
}
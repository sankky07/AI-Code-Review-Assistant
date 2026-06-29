package com.sanket.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/api/me")
    public Map<String, Object> currentUser(Authentication authentication) {

        OAuth2User user = (OAuth2User) authentication.getPrincipal();

        return user.getAttributes();
    }

}
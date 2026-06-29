package com.sanket.backend.user;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/api/user/me")
    public Map<String, Object> currentUser(
            @AuthenticationPrincipal OAuth2User user) {

        Map<String, Object> response = new HashMap<>();

        response.put("name", user.getAttribute("name"));
        response.put("login", user.getAttribute("login"));
        response.put("avatarUrl", user.getAttribute("avatar_url"));

        return response;
    }
}
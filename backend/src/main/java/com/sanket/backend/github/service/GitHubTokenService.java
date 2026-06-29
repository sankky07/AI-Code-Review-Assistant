package com.sanket.backend.github.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GitHubTokenService {

    private final Map<String, String> tokenStore = new ConcurrentHashMap<>();

    public void saveToken(String username, String token) {
        tokenStore.put(username, token);
    }

    public String getToken(String username) {
        return tokenStore.get(username);
    }

    public void removeToken(String username) {
        tokenStore.remove(username);
    }
}
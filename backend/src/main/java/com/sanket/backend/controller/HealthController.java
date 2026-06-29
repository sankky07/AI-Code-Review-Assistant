package com.sanket.backend.controller;

import com.sanket.backend.dto.HealthResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public HealthResponse health() {

        return new HealthResponse(
                "UP",
                "AI Code Review Assistant",
                "1.0.0",
                LocalDateTime.now().toString()
        );
    }
}
package com.sanket.backend.ai.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanket.backend.ai.config.GeminiConfig;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class AIClient {

    private final RestTemplate restTemplate;
    private final GeminiConfig geminiConfig;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AIClient(RestTemplate restTemplate,
                    GeminiConfig geminiConfig) {

        this.restTemplate = restTemplate;
        this.geminiConfig = geminiConfig;
    }

    public String reviewCode(String code) {

        String url = "https://api.groq.com/openai/v1/chat/completions";

        String prompt = """
You are a Senior Software Engineer.

Review this GitHub repository.

Return your answer in Markdown using the following headings:

# Overall Summary

# Architecture Review

# Bugs

# Security Issues

# Performance Issues

# Code Smells

# Best Practices

# Suggested Improvements

# Overall Score (/10)

Repository Code:

""" + code;

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(geminiConfig.getApiKey());

        Map<String, Object> request = Map.of(

                "model", "llama-3.3-70b-versatile",

                "messages", List.of(

                        Map.of(
                                "role", "user",
                                "content", prompt
                        )

                ),

                "temperature", 0.2

        );

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(request, headers);

        try {

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            JsonNode json =
                    objectMapper.readTree(response.getBody());

            return json
                    .get("choices")
                    .get(0)
                    .get("message")
                    .get("content")
                    .asText();

        }

        catch (Exception e) {

            e.printStackTrace();

            return """
                    # AI Review Failed

                    Unable to contact Groq API.

                    Please check:

                    • API key
                    • Internet connection
                    • Rate limits

                    """;

        }

    }

}
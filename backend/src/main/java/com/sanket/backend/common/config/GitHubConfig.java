package com.sanket.backend.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.kohsuke.github.GitHubBuilder;

@Configuration
public class GitHubConfig {

    @Bean
    public GitHubBuilder gitHubBuilder() {
        return new GitHubBuilder();
    }
}
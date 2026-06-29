package com.sanket.backend.github.controller;

import com.sanket.backend.github.entity.GitHubRepository;
import com.sanket.backend.github.service.GitHubService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import com.sanket.backend.entity.User;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import com.sanket.backend.repository.UserRepository;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private final GitHubService gitHubService;
    private final UserRepository userRepository;

    public GitHubController(GitHubService gitHubService,
                            UserRepository userRepository) {
        this.gitHubService = gitHubService;
        this.userRepository = userRepository;
    }

    @PostMapping("/import")
    public String importRepositories(
            Authentication authentication,
            @RegisteredOAuth2AuthorizedClient("github")
            OAuth2AuthorizedClient authorizedClient) throws IOException {
        System.out.println("IMPORT API HIT");
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        Long githubId = Long.valueOf(oauthUser.getAttribute("id").toString());

        User user = userRepository
                .findByGithubId(githubId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return gitHubService.importRepositories(user, authorizedClient);
    }

    @GetMapping("/repositories")
    public List<GitHubRepository> repositories() {
        return gitHubService.getRepositories();
    }

    @GetMapping("/repositories/{id}")
    public GitHubRepository repository(@PathVariable Long id) {

        return gitHubService.getRepository(id);

    }
}
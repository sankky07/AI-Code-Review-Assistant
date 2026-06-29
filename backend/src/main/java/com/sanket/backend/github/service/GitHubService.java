package com.sanket.backend.github.service;

import com.sanket.backend.entity.User;
import com.sanket.backend.github.entity.GitHubRepository;
import com.sanket.backend.github.repository.GitHubRepositoryRepository;
import com.sanket.backend.repository.UserRepository;
import org.kohsuke.github.GHMyself;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class GitHubService {

    private final GitHubRepositoryRepository repositoryRepository;

    public GitHubService(
            GitHubRepositoryRepository repositoryRepository,
            UserRepository userRepository) {

        this.repositoryRepository = repositoryRepository;
    }

    public List<GitHubRepository> getRepositories() {
        return repositoryRepository.findAll();
    }

    public String importRepositories(
            User user,
            OAuth2AuthorizedClient authorizedClient) throws IOException{
        String accessToken = authorizedClient.getAccessToken().getTokenValue();
        GitHub github = new GitHubBuilder()
                .withOAuthToken(accessToken)
                .build();

        GHMyself me = github.getMyself();

        for (GHRepository repo : me.listRepositories()) {

            if (repositoryRepository.findByGithubRepositoryId(repo.getId()).isPresent()) {
                continue;
            }

            GitHubRepository entity = new GitHubRepository();

            entity.setGithubRepositoryId(repo.getId());
            entity.setName(repo.getName());
            entity.setFullName(repo.getFullName());
            entity.setDescription(repo.getDescription());
            entity.setPrivate(repo.isPrivate());
            entity.setDefaultBranch(repo.getDefaultBranch());
            entity.setLanguage(
                    repo.getLanguage() == null ? "Unknown" : repo.getLanguage()
            );
            entity.setHtmlUrl(repo.getHtmlUrl().toString());
            entity.setUser(user);

            repositoryRepository.save(entity);
        }

        return "Repositories Imported Successfully";
    }
    public GitHubRepository getRepository(Long id) {

        return repositoryRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Repository not found"));

    }

}
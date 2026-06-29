package com.sanket.backend.github.repository;

import com.sanket.backend.github.entity.GitHubRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GitHubRepositoryRepository extends JpaRepository<GitHubRepository, Long> {

    Optional<GitHubRepository> findByGithubRepositoryId(Long githubRepositoryId);

}
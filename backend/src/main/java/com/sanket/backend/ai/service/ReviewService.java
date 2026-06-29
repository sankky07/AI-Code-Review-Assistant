package com.sanket.backend.ai.service;

import com.sanket.backend.ai.client.AIClient;
import com.sanket.backend.ai.dto.ReviewResponse;
import com.sanket.backend.ai.entity.Review;
import com.sanket.backend.ai.repository.ReviewRepository;
import com.sanket.backend.github.entity.GitHubRepository;
import com.sanket.backend.github.repository.GitHubRepositoryRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewService {

    private final RepositoryCloneService cloneService;
    private final FileScannerService fileScannerService;
    private final GitHubRepositoryRepository repositoryRepository;
    private final AIClient aiClient;
    private final ReviewRepository reviewRepository;


    public void deleteReview(Long id) {

        reviewRepository.deleteById(id);

    }

    public void deleteAllHistory() {

        reviewRepository.deleteAll();

    }

    public ReviewService(
            RepositoryCloneService cloneService,
            FileScannerService fileScannerService,
            GitHubRepositoryRepository repositoryRepository,
            AIClient aiClient,
            ReviewRepository reviewRepository) {

        this.cloneService = cloneService;
        this.fileScannerService = fileScannerService;
        this.repositoryRepository = repositoryRepository;
        this.aiClient = aiClient;
        this.reviewRepository = reviewRepository;
    }

    public List<String> runReview(Long repositoryId) throws Exception {

        GitHubRepository repository = repositoryRepository
                .findById(repositoryId)
                .orElseThrow(() -> new RuntimeException("Repository not found"));

        File folder = cloneService.cloneRepository(repository);

        List<File> files = fileScannerService.scanSourceFiles(folder);

        StringBuilder repositoryCode = new StringBuilder();

        repositoryCode.append("Repository Name: ")
                .append(repository.getName())
                .append("\n");

        repositoryCode.append("Default Branch: ")
                .append(repository.getDefaultBranch())
                .append("\n");

        repositoryCode.append("Language: ")
                .append(repository.getLanguage())
                .append("\n\n");

        for (File file : files) {

            repositoryCode.append("\n====================================\n");
            repositoryCode.append("FILE: ");
            repositoryCode.append(file.getName());
            repositoryCode.append("\n====================================\n\n");

            repositoryCode.append(
                    Files.readString(file.toPath())
            );

            repositoryCode.append("\n\n");
        }

        // Single Gemini API call
        String review = aiClient.reviewCode(repositoryCode.toString());

        Review entity = new Review();

        entity.setRepository(repository);

        entity.setFileName(repository.getFullName());

        entity.setReview(review);

        int score = 0;

        try {

            String lower = review.toLowerCase();

            java.util.regex.Matcher matcher =
                    java.util.regex.Pattern.compile(
                            "score(?:\\s*\\(/10\\))?.*?(\\d+(?:\\.\\d+)?)\\s*(?:/|out of)\\s*10",
                            java.util.regex.Pattern.DOTALL
                    ).matcher(lower);

            if (matcher.find()) {

                score = (int) Math.round(
                        Double.parseDouble(matcher.group(1))
                );

            }

        } catch (Exception e) {

            score = 0;

        }

        entity.setScore(score);

        entity.setReviewedAt(LocalDateTime.now());

        reviewRepository.save(entity);

        return List.of(review);

    }
    public List<ReviewResponse> getHistory(Long repositoryId) {

        return reviewRepository.findByRepositoryId(repositoryId)
                .stream()
                .map(review -> {

                    ReviewResponse dto = new ReviewResponse();

                    dto.setId(review.getId());

                    dto.setFileName(review.getFileName());

                    if (review.getRepository() != null) {

                        dto.setRepositoryName(
                                review.getRepository().getName()
                        );

                        dto.setLanguage(
                                review.getRepository().getLanguage()
                        );

                    }

                    dto.setReview(review.getReview());

                    dto.setScore(review.getScore());

                    dto.setReviewedAt(review.getReviewedAt().toString());

                    return dto;

                })
                .toList();
    }
    public List<ReviewResponse> getAllHistory() {

        return reviewRepository
                .findAllByOrderByReviewedAtDesc()
                .stream()
                .map(review -> {

                    ReviewResponse dto = new ReviewResponse();

                    dto.setId(review.getId());

                    dto.setFileName(review.getFileName());

                    if (review.getRepository() != null) {

                        dto.setRepositoryName(
                                review.getRepository().getName()
                        );

                        dto.setLanguage(
                                review.getRepository().getLanguage()
                        );

                    }

                    dto.setReview(review.getReview());

                    dto.setScore(review.getScore());

                    dto.setReviewedAt(review.getReviewedAt().toString());

                    return dto;

                })
                .toList();

    }

}
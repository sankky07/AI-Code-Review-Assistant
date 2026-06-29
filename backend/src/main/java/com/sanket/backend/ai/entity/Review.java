package com.sanket.backend.ai.entity;

import com.sanket.backend.github.entity.GitHubRepository;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Column(columnDefinition = "TEXT")
    private String review;

    private Integer score;

    private LocalDateTime reviewedAt;

    @ManyToOne
    @JoinColumn(name = "repository_id")
    private GitHubRepository repository;

    
    public Review() {}

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }

    public void setRepository(GitHubRepository repository) {
        this.repository = repository;
    }
}
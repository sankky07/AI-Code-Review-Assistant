package com.sanket.backend.ai.repository;

import com.sanket.backend.ai.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByRepositoryId(Long repositoryId);

    List<Review> findAllByOrderByReviewedAtDesc();
    void deleteById(Long id);

    void deleteAll();
}
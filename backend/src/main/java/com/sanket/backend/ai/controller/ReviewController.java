package com.sanket.backend.ai.controller;

import com.sanket.backend.ai.service.ReviewService;
import org.springframework.web.bind.annotation.*;
import com.sanket.backend.ai.entity.Review;
import com.sanket.backend.ai.dto.ReviewResponse;
import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/run/{id}")
    public List<String> runReview(@PathVariable Long id) throws Exception {

        return reviewService.runReview(id);
    }
    @GetMapping("/history/{id}")
    public List<ReviewResponse> history(@PathVariable Long id){

        return reviewService.getHistory(id);
    }
    @GetMapping("/history")
    public List<ReviewResponse> getAllHistory() {

        return reviewService.getAllHistory();

    }
    @DeleteMapping("/history/{id}")
    public void deleteReview(@PathVariable Long id) {

        reviewService.deleteReview(id);

    }

    @DeleteMapping("/history")
    public void deleteAllHistory() {

        reviewService.deleteAllHistory();

    }
}
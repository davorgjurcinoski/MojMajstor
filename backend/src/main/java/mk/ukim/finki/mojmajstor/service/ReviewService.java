package mk.ukim.finki.mojmajstor.service;

import mk.ukim.finki.mojmajstor.domain.Review;
import mk.ukim.finki.mojmajstor.domain.User;
import mk.ukim.finki.mojmajstor.dto.ReviewRequest;
import mk.ukim.finki.mojmajstor.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

    public void review(ReviewRequest reviewRequest, Long reviewerId, String reviewerName) {

        Review review = new Review(
                reviewerId,
                reviewerName,
                (long) reviewRequest.getReviewingId(),
                reviewRequest.getComment(),
                reviewRequest.getRating());
        this.reviewRepository.save(review);
    }

    public List<Review> findAllReviews(Long reviewerId) {
        return this.reviewRepository.findAllBytoId(reviewerId);
    }
}

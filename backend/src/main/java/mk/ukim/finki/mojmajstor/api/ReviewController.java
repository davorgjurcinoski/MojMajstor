package mk.ukim.finki.mojmajstor.api;

import mk.ukim.finki.mojmajstor.domain.Review;
import mk.ukim.finki.mojmajstor.domain.User;
import mk.ukim.finki.mojmajstor.dto.ReviewRequest;
import mk.ukim.finki.mojmajstor.service.ReviewService;
import mk.ukim.finki.mojmajstor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    ResponseEntity<?> review(Principal principal, @RequestBody ReviewRequest review) {
        User user = this.userService.findByEmailOrNull(principal.getName());
        reviewService.review(review, user.getId(), user.getFullName());
        userService.updateAverageRating((long)review.getReviewingId());
        return ResponseEntity.ok().body(user);
    }

    @GetMapping
    ResponseEntity<?> review(@RequestParam Long id) {
        List<Review> reviews = reviewService.findAllReviews(id);
        return ResponseEntity.ok().body(reviews);
    }
}

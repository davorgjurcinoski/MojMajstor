package mk.ukim.finki.mojmajstor.service;

import mk.ukim.finki.mojmajstor.domain.Rating;
import mk.ukim.finki.mojmajstor.domain.Worker;
import mk.ukim.finki.mojmajstor.repository.RatingRepository;
import mk.ukim.finki.mojmajstor.repository.UserRepository;
import mk.ukim.finki.mojmajstor.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkerService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkerRepository workerRepository;

    public void updateAverageRating(Long workerId) {
        Double averageRating = ratingRepository.findAverageRatingByWorkerId(workerId);
        if (averageRating != null) {
            Worker worker = workerRepository.findById(workerId).orElseThrow(() -> new RuntimeException("Worker not found"));
            worker.setAverageRating(Math.round(averageRating));
            workerRepository.save(worker);
        }
    }

    public void addRating(Long userId, Long workerId, int ratingValue) {
        Rating rating = new Rating();
        rating.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
        rating.setWorker(workerRepository.findById(workerId).orElseThrow(() -> new RuntimeException("Worker not found")));
        rating.setRating(ratingValue);

        ratingRepository.save(rating);

        updateAverageRating(workerId);
    }
}

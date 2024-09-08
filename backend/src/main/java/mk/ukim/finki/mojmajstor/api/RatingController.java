package mk.ukim.finki.mojmajstor.api;

import mk.ukim.finki.mojmajstor.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private WorkerService workerService;

    @PostMapping("/rate")
    public ResponseEntity<String> rateWorker(@RequestParam Long userId, @RequestParam Long workerId, @RequestParam int rating) {
        workerService.addRating(userId, workerId, rating);
        return ResponseEntity.ok("Rating submitted and average updated");
    }
}


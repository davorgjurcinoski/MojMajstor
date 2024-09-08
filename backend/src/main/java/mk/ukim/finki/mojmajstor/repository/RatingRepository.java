package mk.ukim.finki.mojmajstor.repository;

import mk.ukim.finki.mojmajstor.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.worker.id = :workerId")
    Double findAverageRatingByWorkerId(@Param("workerId") Long workerId);
}

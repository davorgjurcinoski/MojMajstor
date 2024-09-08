package mk.ukim.finki.mojmajstor.repository;

import mk.ukim.finki.mojmajstor.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllBytoId(Long id);
}

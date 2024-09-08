package mk.ukim.finki.mojmajstor.repository;

import mk.ukim.finki.mojmajstor.domain.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {
}

package mk.ukim.finki.mojmajstor.repository;

import mk.ukim.finki.mojmajstor.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findAllByFullNameContaining(String search);

    Page<User> findAll(Pageable pageable);

}

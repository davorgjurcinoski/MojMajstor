package mk.ukim.finki.mojmajstor.service;

import mk.ukim.finki.mojmajstor.authentication.service.HashService;
import mk.ukim.finki.mojmajstor.domain.Review;
import mk.ukim.finki.mojmajstor.domain.User;
import mk.ukim.finki.mojmajstor.domain.Role;
import mk.ukim.finki.mojmajstor.dto.UserRequest;
import mk.ukim.finki.mojmajstor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private HashService hashService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewService reviewService;

    public User findByEmailOrNull(String email) {
        return this.repository.findByEmail(email).orElse(null);
    }

    public User save(UserRequest user) {
        User newUser = User.builder()
                .fullName(user.fullName)
                .email(user.email)
                .password(hashService.hashBcrypt(user.password))
                .role(Role.NORMAL)
                .build();

        return repository.save(newUser);
    }

    public User update(UserRequest user) {
        User updatedUser = this.findByEmailOrNull(user.email);
        updatedUser.setEmail(user.email);
        updatedUser.setFullName(user.fullName);
        updatedUser.setWorker(user.worker);
        return repository.save(updatedUser);
    }

    public List<User> findAllByName(String search) {
        return repository.findAllByFullNameContaining(search);
    }

    public Page<User> findAllPageable(PageRequest pageRequest) {
        return userRepository.findAll(pageRequest);
    }


    public User findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void updateAverageRating(Long id) {
        List<Review> reviews = this.reviewService.findAllReviews(id);

        if (!reviews.isEmpty()) {
            double averageRating = reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);

            User user = this.userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.getWorker().setAverageRating((long)averageRating);
            this.userRepository.save(user);
        }
    }
}

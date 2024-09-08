package mk.ukim.finki.mojmajstor.api;

import mk.ukim.finki.mojmajstor.domain.User;
import mk.ukim.finki.mojmajstor.dto.UserRequest;
import mk.ukim.finki.mojmajstor.dto.UserResponse;
import mk.ukim.finki.mojmajstor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserService service;

    @GetMapping
    public ResponseEntity<?> getProfile(@RequestParam(name = "id", required = false) Long id, Principal principal) {
        User user;
        if (id != null) {
            user = service.findById(id);
        } else {
            String username = principal.getName();
            user = service.findByEmailOrNull(username);
        }
        UserResponse profile = userToResponse(user);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam String search, Principal principal) {
        List<UserResponse> users = service.findAllByName(search).stream()
                .filter(user -> user.getWorker() != null)
                .map(this::userToResponse)
                .toList();
        if(principal != null) {
            User self = service.findByEmailOrNull(principal.getName());
            users = users.stream().filter(user -> !user.equals(userToResponse(self))).toList();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/searchPageable")
    public ResponseEntity<?> searchUsers(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size,
                                         Principal principal) {
        PageRequest pageRequest = PageRequest.of(page, size);

        Page<User> userPage = service.findAllPageable(pageRequest);

        List<UserResponse> userResponses = userPage.stream()
                .filter(user -> user.getWorker() != null)
                .map(this::userToResponse)
                .collect(Collectors.toList());
        if(principal != null) {
            User self = service.findByEmailOrNull(principal.getName());
            userResponses = userResponses.stream().filter(user -> !user.equals(userToResponse(self))).toList();
        }

        Page<UserResponse> responsePage = new PageImpl<>(userResponses, pageRequest, userPage.getTotalElements());

        return ResponseEntity.ok(responsePage);
    }



    @PostMapping
    public ResponseEntity<Void> updateProfile(Principal principal, @RequestBody UserRequest profile) {
        String username = principal.getName();
        if (!Objects.equals(username, profile.email)) {
            return ResponseEntity.badRequest().build();
        }
        service.update(profile);
        return ResponseEntity.ok().build();
    }

    private UserResponse userToResponse(User user) {
        UserResponse response = new UserResponse();
        response.id = user.getId();
        response.email = user.getEmail();
        response.fullName = user.getFullName();
        response.worker = user.getWorker();
        response.role = user.getRole();
        return response;
    }
}
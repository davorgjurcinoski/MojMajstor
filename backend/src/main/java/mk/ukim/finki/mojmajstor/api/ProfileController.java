package mk.ukim.finki.mojmajstor.api;

import mk.ukim.finki.mojmajstor.domain.User;
import mk.ukim.finki.mojmajstor.dto.UserDto;
import mk.ukim.finki.mojmajstor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserService service;

    @GetMapping
    public ResponseEntity<?> getProfile(Principal principal)
        String username = principal.getName();
        User user = service.findByEmailOrNull(username);
        UserDto profile = userToDto(user);
        return ResponseEntity.ok(profile);
    }

    @PostMapping
    public ResponseEntity<Void> updateProfile(Principal principal, @RequestBody UserDto profile) {
        String username = principal.getName();
        if(!Objects.equals(username, profile.email)) {
            return ResponseEntity.badRequest().build();
        }
        service.update(profile);
        return ResponseEntity.ok().build();
    }

    private UserDto userToDto(User user) {
        UserDto userProfileDTO = new UserDto();
        userProfileDTO.fullName = user.getFullName();
        userProfileDTO.email = user.getEmail();
        userProfileDTO.address = user.getAddress();
        userProfileDTO.municipality = user.getMunicipality();
        userProfileDTO.phoneNumber = user.getPhoneNumber();
        userProfileDTO.description = user.getDescription();
        return userProfileDTO;
    }
}
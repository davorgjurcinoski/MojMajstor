package mk.ukim.finki.mojmajstor.api;

import mk.ukim.finki.mojmajstor.authentication.TokenService;
import mk.ukim.finki.mojmajstor.authentication.service.HashService;
import mk.ukim.finki.mojmajstor.domain.User;
import mk.ukim.finki.mojmajstor.dto.LoginDto;
import mk.ukim.finki.mojmajstor.dto.LoginResponseDto;
import mk.ukim.finki.mojmajstor.dto.UserDto;
import mk.ukim.finki.mojmajstor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private HashService hashService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto payload) {
        if (userService.findByEmailOrNull(payload.email) != null) {
            return ResponseEntity.badRequest().body("A user with this email already exists.");
        }
        User user = userService.save(payload);
        return ResponseEntity.ok(new LoginResponseDto(tokenService.createToken(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<?>  login(@RequestBody LoginDto payload) {
        User user = userService.findByEmailOrNull(payload.email);
        if (user != null && hashService.checkBcrypt(payload.password, user.getPassword())) {
            LoginResponseDto response = new LoginResponseDto(tokenService.createToken(user));
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("Invalid Credentials.");
        }
    }

}

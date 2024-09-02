package mk.ukim.finki.mojmajstor.service;

import mk.ukim.finki.mojmajstor.authentication.service.HashService;
import mk.ukim.finki.mojmajstor.domain.User;
import mk.ukim.finki.mojmajstor.domain.Role;
import mk.ukim.finki.mojmajstor.dto.UserDto;
import mk.ukim.finki.mojmajstor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private HashService hashService;
    @Autowired
    private UserRepository userRepository;

    public User findByEmailOrNull(String email) {
        return this.repository.findByEmail(email).orElse(null);
    }

    public User save(UserDto user) {
        User newUser = User.builder()
                .fullName(user.fullName)
                .email(user.email)
                .address(user.address)
                .municipality(user.municipality)
                .phoneNumber(user.phoneNumber)
                .password(hashService.hashBcrypt(user.password))
                .role(Role.NORMAL)
                .build();

        return repository.save(newUser);
    }

    public User update(UserDto user) {
        User updatedUser = this.findByEmailOrNull(user.email);
        updatedUser.setFullName(user.fullName);
        updatedUser.setEmail(user.email);
        updatedUser.setAddress(user.address);
        updatedUser.setMunicipality(user.municipality);
        updatedUser.setPhoneNumber(user.phoneNumber);
        updatedUser.setDescription(user.description);
        return repository.save(updatedUser);
    }
}

package mk.ukim.finki.mojmajstor.dto;

import mk.ukim.finki.mojmajstor.domain.Role;
import mk.ukim.finki.mojmajstor.domain.Worker;

public class UserResponse {
    public Long id;
    public String email;
    public String fullName;
    public Role role;
    public Worker worker;
}

package mk.ukim.finki.mojmajstor.authentication;

import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;

@Data
public class CustomPrincipal implements Principal {

    UserDetails userDetails;

    public CustomPrincipal(UserDetails userDetails, Long userId) {
        this.userDetails = userDetails;
    }

    @Override
    public String getName() {
        return userDetails.getUsername();
    }
}

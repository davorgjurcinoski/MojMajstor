package mk.ukim.finki.mojmajstor.authentication;

import mk.ukim.finki.mojmajstor.domain.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TokenService {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final UserDetailsService userDetailsService;

    public TokenService(JwtDecoder jwtDecoder, JwtEncoder jwtEncoder, UserDetailsService userDetailsService) {
        this.jwtDecoder = jwtDecoder;
        this.jwtEncoder = jwtEncoder;
        this.userDetailsService = userDetailsService;
    }

    public String createToken(User user) {
        JwsHeader jwsHeader = JwsHeader.with(() -> "HS256").build();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plus(30L, ChronoUnit.DAYS))
                .subject(user.getFullName())
                .claim("email", user.getEmail())
                .claim("roles", user.getRole())
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    public UserDetails parseToken(String token) {
        try {
            Jwt jwt = jwtDecoder.decode(token);
            String email = jwt.getClaims().get("email").toString();
            return userDetailsService.loadUserByUsername(email);
        } catch (Exception e) {
            return null;
        }
    }

    public Long getUserIdFromToken(String token) {
        Jwt jwt = jwtDecoder.decode(token);
        return (Long) jwt.getClaims().get("userId");
    }

    public String getEmailFromToken(String token) {
        Jwt jwt = jwtDecoder.decode(token);
        return jwt.getClaims().get("email").toString();
    }

    public UserDetails loadUserByUsername(String email) {
        return userDetailsService.loadUserByUsername(email);
    }
}



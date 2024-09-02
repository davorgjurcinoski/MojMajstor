package mk.ukim.finki.mojmajstor.authentication.authenticationProvider;

import mk.ukim.finki.mojmajstor.authentication.CustomPrincipal;
import mk.ukim.finki.mojmajstor.authentication.TokenService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final TokenService tokenService;

    public CustomAuthenticationProvider(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        if (!(authentication instanceof BearerTokenAuthenticationToken)) {
            return null;
        }

        BearerTokenAuthenticationToken jwt = (BearerTokenAuthenticationToken) authentication;
        String token = jwt.getToken();
        UserDetails userDetails = tokenService.parseToken(token);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid token");
        }

        Long userId = tokenService.getUserIdFromToken(token);

        return new UsernamePasswordAuthenticationToken(
                new CustomPrincipal(userDetails, userId),
                "",
                Collections.singletonList(new SimpleGrantedAuthority("NORMAL"))
        );
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return BearerTokenAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
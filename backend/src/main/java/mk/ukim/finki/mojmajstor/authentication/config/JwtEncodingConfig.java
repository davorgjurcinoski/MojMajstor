package mk.ukim.finki.mojmajstor.authentication.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import javax.crypto.spec.SecretKeySpec;

@Configuration
public class JwtEncodingConfig {
    private final String jwtKey = "secretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecret";
    private final SecretKeySpec secretKey = new SecretKeySpec(jwtKey.getBytes(), "HmacSHA256");

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(secretKey).build();
    }

    @Bean
    JwtEncoder jWtEncoder() {
        ImmutableSecret<SecurityContext> secret = new ImmutableSecret<>(secretKey);
        return new NimbusJwtEncoder(secret);
    }

}

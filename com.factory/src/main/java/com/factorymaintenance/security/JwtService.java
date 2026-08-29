package com.factorymaintenance.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {


    private static final String SECRET_KEY =
            "FactoryMaintenanceSystemSecretKeyForJWT2026";

    private final Key key = Keys.hmacShaKeyFor(
            SECRET_KEY.getBytes(StandardCharsets.UTF_8)
    );

    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 24; // 24 hours


// ==========================================
// GENERATE JWT TOKEN
// ==========================================

    public String generateToken(
            String email,
            String role
    ) {

        return Jwts.builder()
                .setSubject(email)

                // Store user role inside JWT
                .claim("role", role)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )

                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )

                .compact();
    }


// ==========================================
// EXTRACT EMAIL
// ==========================================

    public String extractEmail(String token) {

        return getClaims(token)
                .getSubject();
    }


// ==========================================
// EXTRACT ROLE
// ==========================================

    public String extractRole(String token) {

        return getClaims(token)
                .get("role", String.class);
    }


// ==========================================
// VALIDATE TOKEN
// ==========================================

    public boolean isTokenValid(String token) {

        try {

            Claims claims = getClaims(token);

            return claims
                    .getExpiration()
                    .after(new Date());

        } catch (Exception e) {

            return false;
        }
    }


// ==========================================
// GET CLAIMS
// ==========================================

    private Claims getClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


}

package com.expensenest.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private String secretKey = "your_secret_key";

    // Generate token using user ID (Long) instead of username
    public String generateToken(Long userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))  // Convert userId to String
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 15*60*1000)) // Time for expiry
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Validate token using user ID (Long) instead of username
    public boolean validateToken(String token, Long userId) {
        final Long extractedUserId = extractUserId(token);
        return (extractedUserId.equals(userId) && !isTokenExpired(token));
    }

    // Extract user ID as Long
    public Long extractUserId(String token) {
        return Long.parseLong(extractAllClaims(token).getSubject());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                   .setSigningKey(secretKey)
                   .parseClaimsJws(token)
                   .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
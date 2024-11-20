package com.expensenest.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private String secretKey = "your_secret_key";

    // Original method: Generate token using user ID (Long)
    public String generateToken(Long userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId)) // Convert userId to String
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000)) // 15-minute expiry
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Original method: Validate token using user ID (Long)
    public boolean validateToken(String token, Long userId) {
        final Long extractedUserId = extractUserId(token);
        return (extractedUserId.equals(userId) && !isTokenExpired(token));
    }

    // Original method: Extract user ID as Long
    public Long extractUserId(String token) {
        return Long.parseLong(extractAllClaims(token).getSubject());
    }

    // New method: Generate token using email
    public String generateTokenWithEmail(String email) {
        return Jwts.builder()
                .setSubject(email) // Set email as the subject
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000)) // 15-minute expiry
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // New method: Validate token using email
    public boolean validateTokenWithEmail(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }

    // New method: Extract email from token
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject(); // Subject is the email
    }

    // Helper method to extract claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    // Helper method to check if the token is expired
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
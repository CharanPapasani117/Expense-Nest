package com.expensenest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.expensenest.model.User;
import com.expensenest.service.EmailService;
import com.expensenest.service.UserService;

import com.expensenest.config.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if the user already exists
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }

        user.setVerified(false); // Set verified status to false initially
        userService.saveUser(user);

        // Generate email-based verification token
        String verificationToken = jwtUtil.generateTokenWithEmail(user.getEmail());

        // Construct the verification URL
        String verificationUrl = "http://localhost:8080/api/users/verify?token=" + verificationToken;

        // Send the verification email
        emailService.sendVerificationEmail(user.getEmail(), verificationUrl);

        // Return response to indicate successful registration and verification email
        // sent
        return ResponseEntity.ok("User registered successfully. Please check your email to verify your account.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User retrievedUser = userService.getUserByEmail(user.getEmail());

        // Check if the user exists, password matches, and the user is verified
        if (retrievedUser != null && retrievedUser.getPassword().equals(user.getPassword())) {
            if (retrievedUser.isVerified()) {
                String token = jwtUtil.generateToken(retrievedUser.getId());
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Email not verified. Please check your email to verify your account.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        try {
            // Extract the email from the token
            String email = jwtUtil.extractEmail(token);
            User user = userService.getUserByEmail(email);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            if (user.isVerified()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is already verified.");
            }

            // Mark the user as verified and save
            user.setVerified(true);
            userService.saveUser(user);

            return ResponseEntity.ok("Email verified successfully. You can now log in.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }
}
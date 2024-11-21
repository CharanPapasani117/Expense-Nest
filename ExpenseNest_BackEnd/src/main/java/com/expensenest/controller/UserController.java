package com.expensenest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.expensenest.model.User;
import com.expensenest.service.EmailService;
import com.expensenest.service.UserService;

import com.expensenest.config.JwtUtil;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User Email already exists");
        }
        if (userService.getUserByPhoneNumber(user.getPhoneNumber()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Phone Number already exists");
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

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String email) {

        try {
            System.out.println("Email is " + email);
            // Fetch user details from the service using email
            User user = userService.getUserByEmail(email);

            // Check if the user exists
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("message", "User not found"));
            }

            // Prepare JSON response
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("First Name", user.getFirstName());
            response.put("LastName", user.getLastName());
            response.put("PhoneNumber", user.getPhoneNumber());
            response.put("email", user.getEmail());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Handle unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while fetching the profile"));
        }
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
            String htmlResponse = """
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Email Verification</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f8fb;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                            }
                            .container {
                                text-align: center;
                                background-color: #ffffff;
                                padding: 40px;
                                border-radius: 10px;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                max-width: 500px;
                            }
                            .icon {
                                font-size: 80px;
                                color: #4caf50;
                                margin-bottom: 20px;
                            }
                            h1 {
                                font-size: 24px;
                                color: #333333;
                                margin-bottom: 10px;
                            }
                            p {
                                font-size: 16px;
                                color: #555555;
                            }
                            a {
                                display: inline-block;
                                margin-top: 20px;
                                padding: 10px 20px;
                                color: #ffffff;
                                background-color: #4caf50;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                            }
                            a:hover {
                                background-color: #43a047;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="icon">✅</div>
                            <h1>Email Verified Successfully!</h1>
                            <p>Your email has been verified. You can now log in and access your account.</p>
                            <a href="http://localhost:3000/login">Go to Login</a>
                        </div>
                    </body>
                    </html>
                    """;

            return ResponseEntity.ok().header("Content-Type", "text/html").body(htmlResponse);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        try {
            // Fetch the user from the database
            User existingUser = userService.getUserByEmail(updatedUser.getEmail());

            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("message", "User not found"));
            }

            // Update user details
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            // You can add other fields as needed

            // Save the updated user
            userService.saveUser(existingUser);

            return ResponseEntity.ok(Collections.singletonMap("message", "Profile updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An error occurred while updating the profile"));
        }
    }

}
package com.expensenest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.expensenest.model.User;
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
        if (userService.getUserByEmail(user.getEmail())!= null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        
        // Save the new user
        userService.saveUser(user);
        String token = jwtUtil.generateToken(user.getId());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User retrievedUser = userService.getUserByEmail(user.getEmail());
        
        if (retrievedUser != null && retrievedUser.getPassword().equals(user.getPassword())) {
        	 String token = jwtUtil.generateToken(user.getId());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    
    
}
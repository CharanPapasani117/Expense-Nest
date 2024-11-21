package com.expensenest.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensenest.model.Budget;
import com.expensenest.service.BudgetService;
import com.expensenest.service.EmailService;
import com.expensenest.config.JwtUtil;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private BudgetService budgetService;

    @PostMapping
    public ResponseEntity<Budget> addBudget(@RequestBody Budget budget) {
        return ResponseEntity.ok(budgetService.saveBudget(budget));
    }

    @GetMapping
    public ResponseEntity<List<Budget>> getBudgets() {
        return ResponseEntity.ok(budgetService.getAllBudgets());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> updateBudget(@PathVariable Long id, @RequestBody Budget updatedBudget) {
        return budgetService.updateBudget(id, updatedBudget)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/alert")
    public ResponseEntity<String> alertUser(
            @RequestBody Map<String, String> requestBody) {

        String email = requestBody.get("email");
        System.out.println("Got the email: " + email);
        if (email == null || email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is required");
        }

        // Generate a token that includes the groupId and email
        String inviteUrl = "http://localhost:3000/budgeting";
        String subject = "Alert: Budget Limit Exceeded";
        String message = "Dear User,\n\n" +
                "We noticed that your budget limit has been exceeded. You can visit the link below to review your expenses, identify the categories that have exceeded their limits, and make adjustments accordingly:\n\n"
                +
                inviteUrl + "\n\n" +
                "Taking timely action can help you better manage your finances and stay within your budget.\n\n" +
                "Thank you for choosing ExpenseNest to manage your financial goals.\n\n" +
                "Best regards,\n" +
                "The ExpenseNest Team";

        // Send the email
        emailService.sendVerificationEmail(email, subject, message);

        return ResponseEntity.ok("Invitation sent successfully. Please ask the user to check their email.");
    }
}
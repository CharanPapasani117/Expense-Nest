package com.expensenest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensenest.model.DebtModel;
import com.expensenest.service.DebtService;


@RestController
@RequestMapping("/api/debts")
@CrossOrigin(origins = "http://localhost:3000") // Adjust as necessary
public class DebtController {

    @Autowired
    private DebtService service;

    @GetMapping
    public List<DebtModel> getDebts() {
        return service.getAllDebts();
    }

    @PostMapping
    public DebtModel addDebt(@RequestBody DebtModel debt) {
        return service.saveDebt(debt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DebtModel> updateDebt(@PathVariable Long id, @RequestBody DebtModel updatedDebt) {
        Optional<DebtModel> existingDebt = service.getDebtById(id);
        if (existingDebt.isPresent()) {
            DebtModel debt = existingDebt.get();
            debt.setName(updatedDebt.getName());
            debt.setType(updatedDebt.getType());
            debt.setAmount(updatedDebt.getAmount());
            return ResponseEntity.ok(service.saveDebt(debt));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDebt(@PathVariable Long id) {
        if (service.getDebtById(id).isPresent()) {
            service.deleteDebt(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

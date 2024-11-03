package com.expensenest.controller;

import com.expensenest.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.expensenest.model.Income;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
@CrossOrigin(origins = "http://localhost:3000")  // Adjust the origin as per your frontend's URL
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    @GetMapping
    public List<Income> getAllIncomes() {
        return incomeService.getAllIncomes();
    }

    @PostMapping
    public Income addIncome(@RequestBody Income income) {
        return incomeService.addIncome(income);
    }

    @PutMapping("/{id}")
    public Income updateIncome(@PathVariable Long id, @RequestBody Income incomeDetails) {
        return incomeService.updateIncome(id, incomeDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
    }
}

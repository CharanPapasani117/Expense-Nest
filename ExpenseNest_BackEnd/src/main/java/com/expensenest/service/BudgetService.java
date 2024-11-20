package com.expensenest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensenest.model.Budget;
import com.expensenest.repository.BudgetRepository;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;

    public Budget saveBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }

    public Optional<Budget> updateBudget(Long id, Budget updatedBudget) {
        return budgetRepository.findById(id).map(budget -> {
            budget.setCategory(updatedBudget.getCategory());
            budget.setAmount(updatedBudget.getAmount());
            budget.setStartDate(updatedBudget.getStartDate());
            return budgetRepository.save(budget);
        });
    }
}

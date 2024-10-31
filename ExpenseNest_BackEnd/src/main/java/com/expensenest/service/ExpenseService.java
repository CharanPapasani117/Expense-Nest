package com.expensenest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensenest.model.Expense;
import com.expensenest.repository.ExpenseRepository;

import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id).orElse(null);
    }

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense expense) {
        expense.setId(id);
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}

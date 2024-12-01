package com.expensenest.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensenest.model.Expense;
import com.expensenest.repository.ExpenseRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense saveExpense(Expense expense) {
        if (Boolean.TRUE.equals(expense.getIsRecurring())) {
            // Save the recurring expense as a base entry
            return expenseRepository.save(expense);
        } else {
            // Save a one-time expense
            return expenseRepository.save(expense);
        }
    }

    public List<Expense> getAllExpenses() {
        List<Expense> expenses = expenseRepository.findAll();
        List<Expense> recurringExpenses = expenseRepository.findByIsRecurringTrue();
        List<Expense> calculatedExpenses = new ArrayList<>();

        LocalDate today = LocalDate.now();

        for (Expense recurringExpense : recurringExpenses) {
            LocalDate currentDate = recurringExpense.getStartDate();
            while (!currentDate.isAfter(today) && !currentDate.isAfter(recurringExpense.getEndDate())) {
                LocalDate tempDate = currentDate; // Create a final variable for use in lambda

                boolean exists = expenses.stream()
                        .anyMatch(exp -> exp.getDate().equals(tempDate)
                                && exp.getTitle().equals(recurringExpense.getTitle()));

                if (!exists) {
                    Expense instance = new Expense();
                    instance.setTitle(recurringExpense.getTitle());
                    instance.setAmount(recurringExpense.getAmount());
                    instance.setDate(tempDate); // Use tempDate here
                    instance.setCategory(recurringExpense.getCategory());
                    instance.setMember(recurringExpense.getMember());
                    instance.setDescription(recurringExpense.getDescription());
                    instance.setIsRecurring(false); // This instance is not recurring itself

                    // Save the instance to the database
                    expenseRepository.save(instance);
                    calculatedExpenses.add(instance); // Also add to calculated list
                }

                // Increment date based on frequency
                switch (recurringExpense.getFrequency().toLowerCase()) {
                    case "daily":
                        currentDate = currentDate.plusDays(1);
                        break;
                    case "weekly":
                        currentDate = currentDate.plusWeeks(1);
                        break;
                    case "monthly":
                        currentDate = currentDate.plusMonths(1);
                        break;
                    case "yearly":
                        currentDate = currentDate.plusYears(1);
                        break;
                }
            }
        }

        // Combine existing and calculated expenses
        expenses.addAll(calculatedExpenses);
        return expenses;
    }


    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public Optional<Expense> updateExpense(Long id, Expense updatedExpense) {
        return expenseRepository.findById(id).map(existingExpense -> {
            // Update the recurring entry if applicable
            existingExpense.setTitle(updatedExpense.getTitle());
            existingExpense.setAmount(updatedExpense.getAmount());
            existingExpense.setDate(updatedExpense.getDate());
            existingExpense.setCategory(updatedExpense.getCategory());
            existingExpense.setMember(updatedExpense.getMember());
            existingExpense.setDescription(updatedExpense.getDescription());
            existingExpense.setIsRecurring(updatedExpense.getIsRecurring());
            existingExpense.setFrequency(updatedExpense.getFrequency());
            existingExpense.setStartDate(updatedExpense.getStartDate());
            existingExpense.setEndDate(updatedExpense.getEndDate());

            return expenseRepository.save(existingExpense);
        });
    }
}

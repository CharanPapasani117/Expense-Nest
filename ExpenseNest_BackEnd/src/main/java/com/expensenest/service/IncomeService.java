package com.expensenest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensenest.model.Income;
import com.expensenest.repository.IncomeRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    public Income saveIncome(Income income) {
        if (Boolean.TRUE.equals(income.getIsRecurring())) {
            // Save the recurring income as a base entry
            return incomeRepository.save(income);
        } else {
            // Save a one-time income
            return incomeRepository.save(income);
        }
    }

    public List<Income> getAllIncomes() {
        List<Income> incomes = incomeRepository.findAll();
        List<Income> recurringIncomes = incomeRepository.findByIsRecurringTrue();
        List<Income> calculatedIncomes = new ArrayList<>();

        LocalDate today = LocalDate.now();

        for (Income recurringIncome : recurringIncomes) {
            LocalDate currentDate = recurringIncome.getStartDate();
            while (!currentDate.isAfter(today) && !currentDate.isAfter(recurringIncome.getEndDate())) {
                LocalDate tempDate = currentDate; // Create a final variable for use in lambda

                boolean exists = incomes.stream()
                        .anyMatch(exp -> exp.getDate().equals(tempDate)
                                && exp.getTitle().equals(recurringIncome.getTitle()));

                if (!exists) {
                    Income instance = new Income();
                    instance.setTitle(recurringIncome.getTitle());
                    instance.setAmount(recurringIncome.getAmount());
                    instance.setDate(tempDate); // Use tempDate here
                    instance.setCategory(recurringIncome.getCategory());
                    instance.setMember(recurringIncome.getMember());
                    instance.setDescription(recurringIncome.getDescription());
                    instance.setIsRecurring(false); // This instance is not recurring itself

                    // Save the instance to the database
                    incomeRepository.save(instance);
                    calculatedIncomes.add(instance); // Also add to calculated list
                }

                // Increment date based on frequency
                switch (recurringIncome.getFrequency().toLowerCase()) {
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

        // Combine existing and calculated incomes
        incomes.addAll(calculatedIncomes);
        return incomes;
    }


    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }

    public Optional<Income> updateIncome(Long id, Income updatedIncome) {
        return incomeRepository.findById(id).map(existingIncome -> {
            // Update the recurring entry if applicable
            existingIncome.setTitle(updatedIncome.getTitle());
            existingIncome.setAmount(updatedIncome.getAmount());
            existingIncome.setDate(updatedIncome.getDate());
            existingIncome.setCategory(updatedIncome.getCategory());
            existingIncome.setMember(updatedIncome.getMember());
            existingIncome.setDescription(updatedIncome.getDescription());
            existingIncome.setIsRecurring(updatedIncome.getIsRecurring());
            existingIncome.setFrequency(updatedIncome.getFrequency());
            existingIncome.setStartDate(updatedIncome.getStartDate());
            existingIncome.setEndDate(updatedIncome.getEndDate());

            return incomeRepository.save(existingIncome);
        });
    }
}

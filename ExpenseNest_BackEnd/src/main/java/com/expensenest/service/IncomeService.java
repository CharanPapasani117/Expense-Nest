package com.expensenest.service;

import com.expensenest.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensenest.model.Income;

import java.util.List;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    public List<Income> getAllIncomes() {
        return incomeRepository.findAll();
    }

    public Income addIncome(Income income) {
        return incomeRepository.save(income);
    }

    public Income updateIncome(Long id, Income incomeDetails) {
        Income income = incomeRepository.findById(id).orElseThrow();
        income.setTitle(incomeDetails.getTitle());
        income.setAmount(incomeDetails.getAmount());
        income.setDate(incomeDetails.getDate());
        income.setCategory(incomeDetails.getCategory());
        income.setDescription(incomeDetails.getDescription());
        return incomeRepository.save(income);
    }

    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }
}

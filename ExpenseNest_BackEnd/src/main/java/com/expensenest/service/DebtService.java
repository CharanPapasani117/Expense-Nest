package com.expensenest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensenest.model.DebtModel;
import com.expensenest.repository.DebtRepository;

@Service
public class DebtService {
    @Autowired
    private DebtRepository repository;

    public List<DebtModel> getAllDebts() {
        return repository.findAll();
    }

    public Optional<DebtModel> getDebtById(Long id) {
        return repository.findById(id);
    }

    public DebtModel saveDebt(DebtModel debt) {
        return repository.save(debt);
    }

    public void deleteDebt(Long id) {
        repository.deleteById(id);
    }
}

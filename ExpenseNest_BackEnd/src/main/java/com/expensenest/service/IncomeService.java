package com.expensenest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensenest.model.Income;
import com.expensenest.repository.IncomeRepository;

@Service
public class IncomeService {

	private final IncomeRepository incomeRepository;

	@Autowired
	public IncomeService(IncomeRepository incomeRepository) {
		this.incomeRepository = incomeRepository;
	}

	public Income addIncome(Income income) {
		return incomeRepository.save(income);
	}

	public List<Income> getIncomes(){
		return incomeRepository.findAll();
	}	
	public void deleteIncome(Long id) {
	    incomeRepository.deleteById(id);
	}

    	
}
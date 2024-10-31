package com.expensenest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensenest.model.Income;
import com.expensenest.service.IncomeService;

@RestController
@RequestMapping("/api/income")
@CrossOrigin(origins = "http://localhost:3000")
public class IncomeController {

	private final IncomeService incomeService;

	@Autowired
	public IncomeController(IncomeService incomeService) {
		this.incomeService = incomeService;
	}

	@PostMapping("/add")
	public ResponseEntity<Income> addIncome(@RequestBody Income income) {
		Income savedIncome = incomeService.addIncome(income);
		return new ResponseEntity<>(savedIncome, HttpStatus.CREATED);
	}

	@GetMapping("/get")
	public ResponseEntity<List<Income>> getIncomes() {
		List<Income> incomes = incomeService.getIncomes();
		return new ResponseEntity(incomes, HttpStatus.ACCEPTED);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
	    incomeService.deleteIncome(id);
	    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
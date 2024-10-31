package com.expensenest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.expensenest.model.Advisor;
import com.expensenest.model.Asset;
import com.expensenest.repository.AdvisorRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AdvisorController {
	
	@Autowired 
	private AdvisorRepo advisorRepo;
	
	@PostMapping("/createAdvisor")
	public void createAdvisor(@RequestBody Advisor advisor) {
		advisorRepo.save(advisor);
	}
	
	@GetMapping("/getAllAdvisors")
	public List<Advisor> getAllAdvisors() {
		return advisorRepo.findAll();
	}
}

package com.expensenest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.expensenest.model.Advisor;
import com.expensenest.model.Availability;
import com.expensenest.repository.AdvisorRepo;
import com.expensenest.repository.AvailabilityRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AvailabilityController {
	
	@Autowired
	private AvailabilityRepo availabilityRepo;
	@Autowired
	private AdvisorRepo advisorRepo;
	
	@PostMapping("/{advisorId}/createAvailability")
	public void createAvailability(@PathVariable Long advisorId,@RequestBody Availability availability) {
		Advisor advisor = advisorRepo.findById(advisorId).orElseThrow(() -> new RuntimeException("Advisor not found "));
		availability.setAdvisor(advisor);
		availabilityRepo.save(availability);
	}
	
	@GetMapping("/{advisorId}/getAllAvailability")
	public List<Availability> getAllAvailability(@PathVariable Long advisorId){
		return availabilityRepo.findByAdvisorAdvisorId(advisorId);
	}
	
}

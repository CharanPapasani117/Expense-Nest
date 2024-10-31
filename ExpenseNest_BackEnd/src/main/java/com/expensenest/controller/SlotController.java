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

import com.expensenest.model.Availability;
import com.expensenest.model.Slot;
import com.expensenest.repository.AvailabilityRepo;
import com.expensenest.repository.SlotRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {
	
	@Autowired
	private SlotRepo slotRepo;
	
	@Autowired
	private AvailabilityRepo availabilityRepo;
	
	@PostMapping("/{availabilityId}/createSlot")
	public void createSlot(@PathVariable long availabilityId, @RequestBody Slot slot) {
		Availability availability = availabilityRepo.findById(availabilityId).orElseThrow(() -> new RuntimeException("Availability not found "));
		slot.setAvailability(availability);
		slotRepo.save(slot);
	}
	
	@GetMapping("/{availabilityId}/getAllSlots")
	public List<Slot> getAllSlots(@PathVariable Long availabilityId){
		return slotRepo.findByAvailabilityAvailabilityId(availabilityId);
	}
}
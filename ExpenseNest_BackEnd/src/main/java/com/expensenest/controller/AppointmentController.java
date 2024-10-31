package com.expensenest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.expensenest.model.Appointment;
import com.expensenest.model.Slot;
import com.expensenest.repository.AppointmentRepo;
import com.expensenest.repository.SlotRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
	
	@Autowired
	private AppointmentRepo appointmentRepo;
	@Autowired
	private SlotRepo slotRepo;
	
	@GetMapping("/getAllAppointments")
	private List<Appointment> getAllAppointments(){
		return appointmentRepo.findAll();
	}
	
	@PostMapping("/{slotId}/createAppointment")
	private void createAppointment(@PathVariable Long slotId,@RequestBody Appointment appointment) {
		appointmentRepo.save(appointment);
		Slot slot = slotRepo.findById(slotId).orElseThrow(null);
		slot.setBooked(true);
		slotRepo.save(slot);
	}
}

package com.expensenest.model;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;


@Entity
public class Availability {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long availabilityId;
	
	private LocalDate date;
	
	@ManyToOne
	@JoinColumn(name = "advisor_id", nullable = false)
	@JsonIgnore
	private Advisor advisor;
	
	@OneToMany(mappedBy = "availability", cascade = CascadeType.ALL)
	
	private List<Slot> slots;
	
	public Availability() {
		// TODO Auto-generated constructor stub
	}

	public Availability(long availabilityId, LocalDate date, Advisor advisor, List<Slot> slots) {
		super();
		this.availabilityId = availabilityId;
		this.date = date;
		this.advisor = advisor;
		this.slots = slots;
	}
	
	public Availability(long availabilityId, LocalDate date, Advisor advisor) {
		super();
		this.availabilityId = availabilityId;
		this.date = date;
		this.advisor = advisor;
	}

	
	public Availability(LocalDate date) {
		super();
		this.date = date;
	}
	

	public long getAvailabilityId() {
		return availabilityId;
	}

	public void setAvailabilityId(long availabilityId) {
		this.availabilityId = availabilityId;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Advisor getAdvisor() {
		return advisor;
	}

	public void setAdvisor(Advisor advisor) {
		this.advisor = advisor;
	}

	public List<Slot> getSlots() {
		return slots;
	}

	public void setSlots(List<Slot> slots) {
		this.slots = slots;
	}
	
	
}
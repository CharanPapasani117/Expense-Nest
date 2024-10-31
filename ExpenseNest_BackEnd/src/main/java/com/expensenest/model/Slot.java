package com.expensenest.model;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import com.expensenest.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Slot {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long slotId;
	
	private String startTime;
	private String endTime;
	private boolean isBooked;
	
	@ManyToOne
	@JoinColumn(name = "availability_id", nullable = false)
	@JsonIgnore
	private Availability availability;
	
	

	public Slot() {
		super();
	}


	public Slot(long slotId, String startTime, String endTime, Availability availability) {
		super();
		this.slotId = slotId;
		this.startTime = startTime;
		this.endTime = endTime;
		this.availability = availability;
	}
	
	
	public Slot(String startTime, String endTime, boolean isBooked) {
		super();
		this.startTime = startTime;
		this.endTime = endTime;
		this.isBooked = isBooked;
	}


	public boolean isBooked() {
		return isBooked;
	}


	public void setBooked(boolean isBooked) {
		this.isBooked = isBooked;
	}


	public long getSlotId() {
		return slotId;
	}

	public void setSlotId(long slotId) {
		this.slotId = slotId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Availability getAvailability() {
		return availability;
	}

	public void setAvailability(Availability availability) {
		this.availability = availability;
	}
	
}
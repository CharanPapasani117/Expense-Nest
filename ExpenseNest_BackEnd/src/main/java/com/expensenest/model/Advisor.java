package com.expensenest.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Advisor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long advisorId;
	
	private String name;
	private String specialization;
	private long experience;
	private String qualification;
	
	@OneToMany(mappedBy = "advisor", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Availability> availabilities;

	public Advisor() {
		super();
	}
	
	public Advisor(long advisorId, String name, String specialization, long experience, String qualification) {
		super();
		this.advisorId = advisorId;
		this.name = name;
		this.specialization = specialization;
		this.experience = experience;
		this.qualification = qualification;
	}

	public long getAdvisorId() {
		return advisorId;
	}

	public void setAdvisorId(long advisorId) {
		this.advisorId = advisorId;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public long getExperience() {
		return experience;
	}

	public void setExperience(long experience) {
		this.experience = experience;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public List<Availability> getAvailabilities() {
		return availabilities;
	}

	public void setAvailabilities(List<Availability> availabilities) {
		this.availabilities = availabilities;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}

package com.expensenest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long appintmentId;
	
	private String advisorName;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String date;
	private String slot;
	private String type;
	private String incomeRange;
	private String savingsRange;
	private String goals;
	public Appointment() {
		super();
	}
	public Appointment(Long appintmentId, String advisorName, String firstName, String lastName, String email,
			String phone, String date, String slot, String type, String incomeRange, String savingsRange,
			String goals) {
		super();
		this.appintmentId = appintmentId;
		this.advisorName = advisorName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.date = date;
		this.slot = slot;
		this.type = type;
		this.incomeRange = incomeRange;
		this.savingsRange = savingsRange;
		this.goals = goals;
	}
	public Long getAppintmentId() {
		return appintmentId;
	}
	public void setAppintmentId(Long appintmentId) {
		this.appintmentId = appintmentId;
	}
	public String getAdvisorName() {
		return advisorName;
	}
	public void setAdvisorName(String advisorName) {
		this.advisorName = advisorName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getSlot() {
		return slot;
	}
	public void setSlot(String slot) {
		this.slot = slot;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getIncomeRange() {
		return incomeRange;
	}
	public void setIncomeRange(String incomeRange) {
		this.incomeRange = incomeRange;
	}
	public String getSavingsRange() {
		return savingsRange;
	}
	public void setSavingsRange(String savingsRange) {
		this.savingsRange = savingsRange;
	}
	public String getGoals() {
		return goals;
	}
	public void setGoals(String goals) {
		this.goals = goals;
	}
	
}

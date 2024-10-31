package com.expensenest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensenest.model.Availability;

@Repository
public interface AvailabilityRepo extends JpaRepository<Availability, Long>{
	List<Availability> findByAdvisorAdvisorId(Long advisorId);
}

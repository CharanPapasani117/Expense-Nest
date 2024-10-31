package com.expensenest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensenest.model.Slot;

@Repository
public interface SlotRepo extends JpaRepository<Slot, Long>{
	List<Slot> findByAvailabilityAvailabilityId(Long availabilityId);
}

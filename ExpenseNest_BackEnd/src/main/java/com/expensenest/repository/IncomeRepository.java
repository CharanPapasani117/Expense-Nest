package com.expensenest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensenest.model.Income;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
}

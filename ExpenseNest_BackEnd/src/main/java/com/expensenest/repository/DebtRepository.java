package com.expensenest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensenest.model.DebtModel;


public interface DebtRepository extends JpaRepository<DebtModel, Long> {

}

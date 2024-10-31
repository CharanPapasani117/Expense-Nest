package com.expensenest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensenest.model.Asset;

@Repository
public interface AssetRepo extends JpaRepository<Asset, Long>{

}

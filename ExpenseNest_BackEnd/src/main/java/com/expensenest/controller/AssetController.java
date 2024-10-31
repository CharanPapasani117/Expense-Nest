package com.expensenest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.expensenest.model.Asset;
import com.expensenest.repository.AssetRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AssetController {
	
	@Autowired
	private AssetRepo repo;
	
	@GetMapping("/getAllAssets")
	public List<Asset> getAllAssets() {
		return repo.findAll();
	}
	
	@PostMapping("/createAsset")
	public void createAsset(@RequestBody Asset asset) {
		repo.save(asset);
	}
	
	@DeleteMapping("/deleteAsset/{id}")
	public void deleteAsset(@PathVariable long id) {
		repo.deleteById(id);
	}
	
	 @PutMapping("/updateAsset/{id}")
	   public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @RequestBody Asset updatedAsset) {
	        Optional<Asset> optionalAsset = repo.findById(id);
	        
	        if (optionalAsset.isPresent()) {
	            Asset asset = optionalAsset.get();
	            asset.setAssetName(updatedAsset.getAssetName());
	            asset.setAssetType(updatedAsset.getAssetType());
	            asset.setAssetValue(updatedAsset.getAssetValue());
	            asset.setAssetDescription(updatedAsset.getAssetDescription());
	            repo.save(asset);
	            return ResponseEntity.ok(asset);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	 }
	 
	 @GetMapping("/getAsset/{id}")
	 public Optional<Asset> getAsset(@PathVariable Long id) {
		 return repo.findById(id);
	 }
	 
}

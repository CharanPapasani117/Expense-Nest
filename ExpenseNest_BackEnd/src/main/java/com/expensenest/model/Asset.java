package com.expensenest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Asset {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String assetType;
	private String assetName;
	private float assetValue;
	private String assetDescription;
	
	
	public Asset() {
		super();
	}
	public Asset(long id, String assetType, String assetName, float assetValue, String assetDescription) {
		super();
		this.id = id;
		this.assetType = assetType;
		this.assetName = assetName;
		this.assetValue = assetValue;
		this.assetDescription = assetDescription;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getAssetType() {
		return assetType;
	}
	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}
	public String getAssetName() {
		return assetName;
	}
	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}
	public float getAssetValue() {
		return assetValue;
	}
	public void setAssetValue(float assetValue) {
		this.assetValue = assetValue;
	}
	public String getAssetDescription() {
		return assetDescription;
	}
	public void setAssetDescription(String assetDescription) {
		this.assetDescription = assetDescription;
	}
	
	
	
}

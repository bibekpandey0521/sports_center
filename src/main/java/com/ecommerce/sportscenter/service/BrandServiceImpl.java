package com.ecommerce.sportscenter.service;

import lombok.extern.log4j.Log4j2;
import com.ecommerce.sportscenter.entity.Brand;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ecommerce.sportscenter.model.BrandResponse;

import com.ecommerce.sportscenter.repository.BrandRepository;

@Service
@Log4j2

public class BrandServiceImpl implements BrandService {
	private final BrandRepository brandRepository;

	public BrandServiceImpl(BrandRepository brandRepository) {
		this.brandRepository = brandRepository;
	}

	@Override
	public List<BrandResponse> getAllBrands() {
		
		log.info("Fetching All Brands!!");
		
		List<Brand> brandList = brandRepository.findAll();
		
		//now use stream operator to map with Response
		List<BrandResponse> brandResponse = brandList.stream()
				.map(this::convertToBrandResponse)
				.collect(Collectors.toList());
		log.info("Fetched All Brands!!!");
		return brandResponse;
	}
	private BrandResponse convertToBrandResponse(Brand brand) {
		return BrandResponse.builder()
				.id(brand.getId())
				.name(brand.getName())
				.build();
	}
}

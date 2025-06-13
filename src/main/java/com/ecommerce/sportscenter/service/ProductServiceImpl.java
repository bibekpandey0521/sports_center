package com.ecommerce.sportscenter.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.sportscenter.model.ProductResponse;
import com.ecommerce.sportscenter.repository.ProductRepository;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.extern.log4j.Log4j2;
import com.ecommerce.sportscenter.entity.Product;

import org.springframework.data.jpa.domain.Specification;

@Service
@Log4j2

public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;

	public ProductServiceImpl(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Override
	public ProductResponse getProductById(Integer productId) {
		log.info("fetching Product By Id");
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new RuntimeException("Product  doesnot exists"));
		ProductResponse productResponse = convertToProductResponse(product);
		log.info("Fetched Product by Product Id:{}",productId);
		
		return productResponse ;
	}

	@Override
	public Page<ProductResponse> getProducts(Pageable pageable,Integer brandId,Integer typeId,String keyword) {
		log.info("Fetching Products !!");
		Specification<Product> spec = Specification.where(null);
		if(brandId!=null) {
			spec = spec.and((root,query,criteriaBuilder)->criteriaBuilder.equal(root.get("brand").get("id"),brandId));	
		}
		if(typeId!=null) {
			spec = spec.and((root,query,criteriaBuilder)->criteriaBuilder.equal(root.get("type").get("id"), typeId));
		}
		if(keyword!=null && !keyword.isEmpty()) {
			spec = spec.and((root,query,criteriaBuilder)->criteriaBuilder.like(root.get("name"),"%" + keyword + "%"));
		}
		log.info("Fetching Products !!");
		return productRepository.findAll(spec,pageable).map(this::convertToProductResponse);
		//Fetching from DB
//		Page<Product> productPage = productRepository.findAll(pageable);
//		//Map
//		Page<ProductResponse> productResponses = productPage
//					.map(this::convertToProductResponse);
////				.collect(Collectors.toList());
//		log.info("Fetched ALl Products!!!");
//		return productResponses;
	}
	
	private ProductResponse convertToProductResponse(Product product) {
		return ProductResponse.builder()
				.id(product.getId())
				.name(product.getName())
				.description(product.getDescription())
				.price(product.getPrice())
				.pictureUrl(product.getPictureUrl())
				.productBrand(product.getBrand().getName())
				.producttype(product.getType().getName())
				.build();
	}
}


package com.ecommerce.sportscenter.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecommerce.sportscenter.model.ProductResponse;

public interface ProductService {
	ProductResponse getProductById(Integer productId);
	Page<ProductResponse> getProducts(Pageable pageable,Integer brand,Integer typeId,String keyword);
}

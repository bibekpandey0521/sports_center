package com.ecommerce.sportscenter.model;

import com.ecommerce.sportscenter.entity.Brand;
import com.ecommerce.sportscenter.entity.Type;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

	private Integer id;

	private String name;

	private String description;

	private Long price;

	private String pictureUrl;

	private String productBrand;

	private String producttype;
}

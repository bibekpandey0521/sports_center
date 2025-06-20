package com.ecommerce.sportscenter.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasketResponse {
	private String id;
	private List<BasketItemResponse> items;
}

package com.ecommerce.sportscenter.model;

import java.time.LocalDateTime;

import com.ecommerce.sportscenter.entity.OrderAggregate.ShippingAddress;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
	private String basketId;
	private ShippingAddress shippingAddress;
	private Long subTotal;
	private Long deliveryFee;
	private LocalDateTime orderDate;
	
}

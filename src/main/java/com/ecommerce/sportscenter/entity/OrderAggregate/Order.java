package com.ecommerce.sportscenter.entity.OrderAggregate;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	@Column(name="basket_Id")
	private String basketId;
	@Embedded
	private ShippingAddress shippingAddress;
	@Column(name="Order_Date")
	private LocalDateTime orderDate = LocalDateTime.now();
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "order")
	private List<OrderItem> orderItems;
	@Column(name="Sub_Total")
	private Double subTotal;
	@Column(name="Delivery_Fee")
	private Long deliveryFee;
	@Enumerated(EnumType.STRING)
	@Column(name="Order_status")
	private OrderStatus orderStatus = OrderStatus.Pending;
	public Double getTotal() {
		return getSubTotal()+getDeliveryFee();
	}
}

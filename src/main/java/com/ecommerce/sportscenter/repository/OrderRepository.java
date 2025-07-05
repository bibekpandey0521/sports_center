package com.ecommerce.sportscenter.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
import com.ecommerce.sportscenter.entity.OrderAggregate.Order;
import com.ecommerce.sportscenter.entity.OrderAggregate.OrderStatus;



public interface OrderRepository extends JpaRepository<Order,Integer>{
	List<Order> findByBasketId(String basketId);
	
	List<Order> findByOrderStatus(OrderStatus orderStatus);
	
	List<Order> findByOrderDateBetween(LocalDateTime startDate,LocalDateTime endDate);
	@Query("Select o FROM Order o JOIN o.orderItems oi where oi.itemOrdered.name LIKE %:productName%")
	List<Order> findByProductNameInOrderItems(@Param("productName") String productName);
	
	@Query("Select o FROM  Order o WHERE o.shippingAddress.city = :city")
	List<Order> findByShippingAddressCity(@Param("city") String city);
	
	
}

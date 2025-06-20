package com.ecommerce.sportscenter.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.sportscenter.entity.Basket;

@Repository
public interface BasketRepository extends CrudRepository<Basket,String>{
	
}

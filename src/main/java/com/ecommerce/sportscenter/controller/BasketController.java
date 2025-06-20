package com.ecommerce.sportscenter.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.sportscenter.entity.Basket;
import com.ecommerce.sportscenter.entity.BasketItem;
import com.ecommerce.sportscenter.model.BasketItemResponse;
import com.ecommerce.sportscenter.model.BasketResponse;
import com.ecommerce.sportscenter.service.BasketService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/baskets")
public class BasketController {
	private final BasketService basketService;
	
	public BasketController(BasketService basketService) {
		this.basketService = basketService;
	}
	
	@GetMapping
	public  List<BasketResponse> getAlBaskets(){
		return basketService.getAllBaskets();
	}
	
	@GetMapping("/{basketId}")
	public BasketResponse getBasketById(@PathVariable String basketId){
		return basketService.getBasketById(basketId);
	}
	@DeleteMapping("/{basketId}")
	public void deleteBasketById(@PathVariable String basketId) {
		basketService.deleteBasketById(basketId);
	}
	
	@PostMapping
	public ResponseEntity<BasketResponse>createBasket(@RequestBody BasketResponse basketResponse){
		//convert this basket response to basket entity
		Basket basket = convertToBasketEntity(basketResponse);
		//call the service method to create the basket
		BasketResponse createdBasket = basketService.createBasket(basket);
		//return the created basket
		return new ResponseEntity<>(createdBasket,HttpStatus.CREATED);
		
	}

	private Basket convertToBasketEntity(BasketResponse basketResponse) {
		Basket basket = new Basket();
		basket.setId(basketResponse.getId());
		basket.setItems(mapBasketItemResponseToEntities(basketResponse.getItems()));
		return basket;
	}

	private List<BasketItem> mapBasketItemResponseToEntities(List<BasketItemResponse> itemResponses) {
		return itemResponses.stream()
				.map(this::convertToBasketItemEntity)
				.collect(Collectors.toList());
	}
	public BasketItem convertToBasketItemEntity(BasketItemResponse itemResponse) {
		BasketItem basketItem = new BasketItem();
		basketItem.setId(itemResponse.getId());
		basketItem.setName(itemResponse.getName());
		basketItem.setDescription(itemResponse.getDescription());
		basketItem.setPrice(itemResponse.getPrice());
		basketItem.setPictureUrl(itemResponse.getPictureUrl());
		basketItem.setProductBrand(itemResponse.getProductBrand());
		basketItem.setProductType(itemResponse.getProductType());
		basketItem.setQunatity(itemResponse.getQunatity());
		return basketItem;
	}
}






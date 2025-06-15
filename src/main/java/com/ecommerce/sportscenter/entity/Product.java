package com.ecommerce.sportscenter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Product")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="Id")
	private Integer id;
	@Column(name="Name")
	private String name;
	@Column(name = "Description",length=1000)
	private String description;
	@Column(name = "Price")
	private Long price;
	@Column(name = "PictureUrl")
	private String pictureUrl;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ProductBrandId", referencedColumnName = "Id")
	private Brand brand;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ProductTypeId", referencedColumnName = "Id")
	private Type type;
}

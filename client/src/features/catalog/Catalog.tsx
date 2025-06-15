import { useEffect, useState } from 'react'
import {Product} from "../../app/models/product";
import ProductList from "./ProductList";
export default function  Catalog(){

		//  const [count, setCount] = useState(0)
		//Define a state variable products,using useState
	//	const [products,setProducts] = useState([
		//	{id:1,name:'Product 1',price:10},	
	//		{id:2,name:'Product 2',price:30},	
	//		{id:3,name:'Product 3',price:30},
				
	//	]);
	const [products,setProducts] = useState<Product[]>([]);
	/*	useEffect(()=>{
			const fetchData = async () =>{
				try{
					const response = await fetch('http://localhost:8080/api/products');
					if(!response.ok){
						throw new Error('Failed to fetch the data');
					}
					const data = await response.json();
					setProducts(data.content);
				}catch(error){
					console.error('Error Fetching Data',error);
				}
			};
			fetchData();
		},[]);
		*/
	  useEffect(()=>{
		fetch('http://localhost:8080/api/products')
		.then(response => response.json())
		.then(data=>setProducts(data.content));
	  },[])	;
	  
	  return (
		/*
		<ul>
			{products.map(product=>(
				<div key={product.id}>
					<p>Name:{product.name}</p>
					<p>Description:{product.description}</p>
					<p>Price: {product.price}</p>
					<p>Brand: {product.productBrand}</p>
					<p>Type: {product.productType}</p>
				</div>
			  ))}
		  </ul> 
		 */ 
		<>
			<ProductList products = {products}/>
		</>
	  )
}
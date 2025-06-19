import { useEffect, useState } from 'react'
import {Product} from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";
export default function  Catalog(){

		//  const [count, setCount] = useState(0)
		//Define a state variable products,using useState
	//	const [products,setProducts] = useState([
		//	{id:1,name:'Product 1',price:10},	
	//		{id:2,name:'Product 2',price:30},	
	//		{id:3,name:'Product 3',price:30},
				
	//	]);
	const [products,setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	
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
	/*  useEffect(()=>{
		fetch('http://localhost:8080/api/products')
		.then(response => response.json())
		.then(data=>setProducts(data.content));
	  },[])	;
	  */
	 
	  useEffect(()=>{
		agent.Store.list()
		.then((products)=>setProducts(products.content))
		.catch((error)=>console.log(error))
		 .finally(()=>setLoading(false));
	  },[]);
	  if (!products) return <h3>Unable to load Product Page..</h3>;
	  if(loading) return <Spinner message='Loading Products...'/>
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
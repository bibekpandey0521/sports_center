import { Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDetails() {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	const extractImageName = (item: Product): string | null => {
		if (item && item.pictureUrl) {
			const parts = item.pictureUrl.split('/');
			return parts[parts.length - 1];
		}
		return null;
	};

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('en-NP', {
			style: 'currency',
			currency: 'NPR',
			minimumFractionDigits: 2,
		}).format(price);
	};

	useEffect(() => {
		axios.get(`http://localhost:8080/api/products/${id}`)
			.then(response => setProduct(response.data))
			.catch(error => console.error(error))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <h3>Loading Product...</h3>;
	if (!product) return <h3>Product Not Found</h3>;

	return (
		<div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
			{/* Image Side */}
			<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<img
					src={`/images/products/${extractImageName(product)}`}
					alt={product.name}
					style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }}
				/>
			</div>

			{/* Details Side */}
			<div style={{ flex: 1 }}>
				<Typography variant="h3" gutterBottom>{product.name}</Typography>
				<Divider sx={{ mb: 2 }} />
				<Typography gutterBottom color='secondary' variant="h4">
					{formatPrice(product.price)}
				</Typography>
				<TableContainer>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>{product.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Description</TableCell>
								<TableCell>{product.description}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Type</TableCell>
								<TableCell>{product.productType}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Brand</TableCell>
								<TableCell>{product.productBrand}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

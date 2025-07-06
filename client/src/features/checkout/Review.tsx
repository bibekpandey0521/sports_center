import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import type { Product } from "../../app/models/product";
import { useAppSelector } from "../../app/store/configureStore"
import BasketSummary from "../basket/BasketSummary";

export default function Review(){
	const {basket} = useAppSelector(state=>state.basket);
	const extractImageName = (item: Product): string | null => {
	    if (item && item.pictureUrl) {
	      const parts = item.pictureUrl.split("/");
	      return parts[parts.length - 1];
	    }
	    return null;
	  };

	  const formatPrice = (price: number): string => {
	    return new Intl.NumberFormat("en-NP", {
	      style: "currency",
	      currency: "NPR",
	      minimumFractionDigits: 2
	    }).format(price);
	  };
	return(
		<Box>
			<Typography variant="h6" gutterBottom>
				Order Summary
			</Typography>
			<Box mb={3}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Product Image</TableCell>
								<TableCell>Product</TableCell>
								<TableCell>Price</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{basket?.items.map((product)=>(
								<TableRow key={product.id}>
									<TableCell>
										{product.pictureUrl && (
											<img
											 src={`/images/products/${extractImageName(product)}`}
											 alt={product.name}
											 width="50"
											 height="50"
											/>
										)}
									</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>{formatPrice(product.price)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box>
				<BasketSummary/>
			</Box>
		</Box>
	);
}
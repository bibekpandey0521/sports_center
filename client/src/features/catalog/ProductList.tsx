import { Box } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 4 equal columns
        gap: 2, // MUI spacing unit (theme.spacing)
      }}
    >
      {products.map((product) => (
        <Box key={product.id}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
}

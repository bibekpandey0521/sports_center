import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
//import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFoundError";
import Spinner from "../../app/layout/Spinner";
export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const extractImageName = (item: Product): string | null => {
    if (item && item.pictureUrl) {
      const parts = item.pictureUrl.split("/");
      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
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

	//axios.get(`http://localhost:8080/api/products/${id}`)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id && agent.Store.details(parseInt(id)) 
      .then(response => setProduct(response))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  if(loading) return <Spinner message='Loading Products...'/>
  if (!product) return <NotFound/>;

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4} padding={4}>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <img
          src={`/images/products/${extractImageName(product)}`}
          alt={product.name}
          style={{ width: "80%", maxWidth: "400px" }}
        />
      </Box>

      <Box flex={1}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography gutterBottom color="secondary" variant="h4">
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
      </Box>
    </Box>
  );
}

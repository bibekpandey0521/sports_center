import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFoundError";
import Spinner from "../../app/layout/Spinner";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function ProductDetails() {
  const { basket } = useAppSelector(state => state.basket);	
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const item = basket?.items.find(i => i.id === product?.id);

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

  useEffect(() => {
    if (id) {
      agent.Store.details(parseInt(id))
        .then(response => {
          setProduct(response);
          const existingItem = basket?.items.find(i => i.id === response.id);
          if (existingItem) {
            setQuantity(existingItem.quantity);
          }
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [id, basket]);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const updateQuantity = async () => {
    try {
      setSubmitting(true);
      const newItem = {
        ...product!,
        quantity: quantity
      };
      if (item) {
        const quantityDifference = quantity - item.quantity;
        if (quantityDifference > 0) {
          await agent.Basket.incrementItemQuantity(item.id, quantityDifference, dispatch);
        } else if (quantityDifference < 0) {
          await agent.Basket.decrementItemQuantity(item.id, Math.abs(quantityDifference), dispatch);
        }
      } else {
        await agent.Basket.addItem(newItem, dispatch);
      }
    } catch (error) {
      console.log("Failed to update quantity:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner message="Loading Products..." />;
  if (!product) return <NotFound />;

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

        {/* Side-by-side Quantity and Button */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mt={2} alignItems="center">
          <TextField
            onChange={inputChange}
            variant="outlined"
            type="number"
            label="Quantity in Cart"
            value={quantity}
            sx={{ width: { xs: '100%', sm: '250px' } }}
          />
          <LoadingButton
            sx={{ height: '56px', minWidth: '260px' }}
            color="primary"
            size="large"
            variant="contained"
            loading={submitting}
            onClick={updateQuantity}
          >
            {item ? 'Update Quantity' : 'Add to Cart'}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}

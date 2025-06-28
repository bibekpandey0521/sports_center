import { useEffect, useState } from 'react';
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";
import {
  Box,
  FormLabel,
  Paper,
  TextField,
  FormControl,
  Pagination,
  RadioGroup,
  Typography,
  FormControlLabel,
  Radio
} from "@mui/material";
import type { Brand } from '../../app/models/brand';
import type { Type } from '../../app/models/type';

const sortOptions = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" }
];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedSort, setSelectedSort] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBrandId, setSelectedBrandId] = useState(0);
  const [selectedTypeId, setSelectedTypeId] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    Promise.all([
      agent.Store.list(currentPage, pageSize),
      agent.Store.brands(),
      agent.Store.types()
    ])
      .then(([productsRes, brandsRes, typesResp]) => {
        setProducts(productsRes.content);
        setTotalItems(productsRes.totalElements);
        setBrands(brandsRes);
        setTypes(typesResp);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [currentPage, pageSize]);

  const loadProducts = (selectedSort: string, searchKeyWord = '') => {
    setLoading(true);
    let page = currentPage - 1;
    let size = pageSize;
    let brandId = selectedBrandId !== 0 ? selectedBrandId : undefined;
    let typeId = selectedTypeId !== 0 ? selectedTypeId : undefined;
    const sort = "name";
    const order = selectedSort === "desc" ? "desc" : "asc";

    let url = `${agent.Store.apiUrl}?sort=${sort}&order=${order}`;
    if (brandId !== undefined || typeId !== undefined) {
      url += '&';
      if (brandId !== undefined) url += `brandId=${brandId}&`;
      if (typeId !== undefined) url += `typeId=${typeId}&`;
      url = url.replace(/&$/, "");
    }

    if (searchKeyWord) {
      agent.Store.search(searchKeyWord)
        .then((productRes) => {
          setProducts(productRes.content);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      agent.Store.list(page, size, undefined, undefined, url)
        .then((productRes) => {
          setProducts(productRes.content);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    loadProducts(selectedSort);
  }, [selectedBrandId, selectedTypeId]);

  const handleSortChange = (event: any) => {
    const selectedSort = event.target.value;
    setSelectedSort(selectedSort);
    loadProducts(selectedSort);
  };

  const handleBrandChange = (event: any) => {
    const selectedBrand = event.target.value;
    const brand = brands.find((b) => b.name === selectedBrand);
    setSelectedBrand(selectedBrand);
    if (brand) {
      setSelectedBrandId(brand.id);
      loadProducts(selectedSort);
    }
  };

  const handleTypeChange = (event: any) => {
    const selectedType = event.target.value;
    const type = types.find((t) => t.name === selectedType);
    setSelectedType(selectedType);
    if (type) {
      setSelectedTypeId(type.id);
      loadProducts(selectedSort);
    }
  };

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <Spinner message="Loading Products..." />;
  if (!products) return <h3>Unable to load products</h3>;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      padding={2}
      gap={3}
    >
      {/* Sidebar */}
      <Box
        flex={{ xs: "none", md: "0 0 25%" }}
        minWidth={{ xs: "100%", md: "250px" }}
      >
        <Paper sx={{ mb: 2 }}>
          <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or description..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                loadProducts(selectedSort, searchTerm);
              }
            }}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel id="sort-by-name-label">Sort By Name</FormLabel>
            <RadioGroup
              aria-label="sort-by-name"
              name="sort-by-name"
              value={selectedSort}
              onChange={handleSortChange}
            >
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel id="brands-labels">Brands</FormLabel>
            <RadioGroup
              aria-label="brands"
              name="brands"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              {brands.map((brand) => (
                <FormControlLabel
                  key={brand.id}
                  value={brand.name}
                  control={<Radio />}
                  label={brand.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel id="types-labels">Types</FormLabel>
            <RadioGroup
              aria-label="types"
              name="types"
              value={selectedType}
              onChange={handleTypeChange}
            >
              {types.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.name}
                  control={<Radio />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      </Box>

      {/* Main Content */}
      <Box flex={1} display="flex" flexDirection="column">
        <Box mb={2} textAlign="center">
          <Typography variant="subtitle1">
            Displaying {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
          </Typography>
        </Box>

        <Box mb={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalItems / pageSize)}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>

        <ProductList products={filteredProducts} />

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalItems / pageSize)}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </Box>
  );
}

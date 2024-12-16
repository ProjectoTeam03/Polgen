import React, { useState } from "react";
import { addProduct } from "../../../../api/product";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct(product);
      setSuccess(true);
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
    } catch (error) {
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: "1rem" }}
        />
        <Button type="submit" variant="contained" disabled={loading} fullWidth>
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Product added successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminAddProduct;


import React, { useState } from "react";
import { addProduct } from "../../../../api/product"; // Import the addProduct function
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [loading, setLoading] = useState(false); // To show a loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const userId = localStorage.getItem("userId"); // Retrieve the logged-in user ID
      await addProduct({ ...product, userId }); // Add the product
      toast.success("Product added successfully!"); // Show success toast
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      }); // Reset the form
    } catch (error) {
      console.error("Error adding product:", error.message);
      toast.error("Failed to add product."); // Show error toast
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          className={styles.textarea}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      <ToastContainer /> {/* Include ToastContainer for rendering toasts */}
    </div>
  );
};

export default AddProduct;


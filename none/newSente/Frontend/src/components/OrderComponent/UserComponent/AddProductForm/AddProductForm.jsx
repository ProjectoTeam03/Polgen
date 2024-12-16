import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/products',
        productData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productData.name}
        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
      />
      <select
        value={productData.category}
        onChange={(e) => setProductData({ ...productData, category: e.target.value })}
      >
        <option value="prob">Prob</option>
        <option value="prime">Prime</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={productData.price}
        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;


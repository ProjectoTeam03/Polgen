import API from './api'; // Reuse the API instance with interceptors

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await API.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error.response?.data || error.message);
    throw error;
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await API.put(`/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await API.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};


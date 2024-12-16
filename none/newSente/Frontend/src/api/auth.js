import API from './api';

// User Registration
export const register = async (data) => {
  try {
    const response = await API.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response?.data || error.message);
    throw error;
  }
};

// User Login
export const login = async (data) => {
  try {
    const response = await API.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error;
  }
};

// Forgot Password Request
export const forgotPassword = async (email) => {
  try {
    const response = await API.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Forgot Password Error:', error.response?.data || error.message);
    throw error;
  }
};

// Reset Password API
export const resetPassword = async (data) => {
  try {
    const response = await API.post('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    console.error('Reset Password Error:', error.response?.data || error.message);
    throw error;
  }
};



// Contact API
export const contact = async (data) => {
  try {
    const response = await API.post('/auth/contact', data);
    return response.data;
  } catch (error) {
    console.error('Contact Error:', error.response?.data || error.message);
    throw error;
  }
};


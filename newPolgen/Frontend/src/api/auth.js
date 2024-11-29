import API from './api';

// Fetch User Profile
export const getUserProfile = async () => {
  try {
    // Retrieve token from localStorage (or sessionStorage)
    const token = localStorage.getItem('authToken');  // Assuming token is stored in localStorage

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await API.get('/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}` // Send token in Authorization header
      }
    });

    return response.data.user;
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};

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
    const { token, user } = response.data;

    // Save the token to localStorage (or sessionStorage)
    localStorage.setItem('authToken', token);

    return { token, user };
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
// In your frontend code (e.g., `auth.js`)
// In your frontend code (e.g., `auth.js`)
export const updateUserProfile = async (updatedData) => {
  try {
    const token = localStorage.getItem('authToken');  // Retrieve token from localStorage

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await API.put('/auth/profile', updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Attach JWT token to headers
      }
    });

    return response.data; // Assuming response.data contains the updated user profile
  } catch (error) {
    console.error('Update Profile Error:', error.response?.data || error.message);
    throw error;
  }
};


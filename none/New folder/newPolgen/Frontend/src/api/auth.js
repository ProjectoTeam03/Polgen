import API from './api';
// src/api/auth.js
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await fetch('/api/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from server:', errorData);
      throw new Error('Failed to fetch user profile');
    }

    return response.json();  // Return user data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from server:', errorData);
      throw new Error('Failed to update user profile');
    }

    return response.json();  // Return updated user data
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Fetch User Profile
// export const getUserProfile = async () => {
//   try {
//     // Retrieve token from localStorage (or sessionStorage)
//     const token = localStorage.getItem('authToken');  // Assuming token is stored in localStorage
//
//     if (!token) {
//       throw new Error('Authentication token is missing');
//     }
//
//     const response = await API.get('/auth/profile', {
//       headers: {
//         'Authorization': `Bearer ${token}` // Send token in Authorization header
//       }
//     });
//
//     return response.data.user; // Assuming the response contains the 'user' field with the user data
//   } catch (error) {
//     console.error('Error fetching user profile:', error.response?.data || error.message);
//
//     if (error.response?.status === 404) {
//       // If 404 occurs due to username mismatch, handle accordingly
//       throw new Error('This username no longer exists. Please check the URL.');
//     }
//
//     throw error;
//   }
// };
//
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

// // Update User Profile
// export const updateUserProfile = async (updatedData) => {
//   try {
//     const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
//
//     if (!token) {
//       throw new Error('Authentication token is missing');
//     }
//
//     // Send the PUT request to update the user's profile
//     const response = await API.put('/auth/profile', updatedData, {
//       headers: {
//         'Authorization': `Bearer ${token}`,  // Attach JWT token to headers
//       }
//     });
//
//     // Assuming the server returns the updated user data
//     return response.data;  // This should include the updated user profile
//
//   } catch (error) {
//     console.error('Update Profile Error:', error.response?.data || error.message);
//
//     // Handle specific errors like if the username no longer exists or any other validation
//     if (error.response?.status === 404) {
//       throw new Error('This username no longer exists. Please check the URL.');
//     }
//
//     throw error;
//   }
// };
//

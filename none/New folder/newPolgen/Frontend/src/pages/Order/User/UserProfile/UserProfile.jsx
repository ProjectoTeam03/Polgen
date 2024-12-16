import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../../../api/auth';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);  // State for user data
  const [editMode, setEditMode] = useState(false);  // State for edit mode
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState(null);  // State for error handling
  const [loading, setLoading] = useState(true);  // State for loading indication

  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile();  // Fetch user profile from API
        setUser(userData);
        setFormData({
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        });
      } catch (error) {
        setError('Error fetching user profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    // Basic form validation
    if (!formData.username || !formData.email || !formData.phone || !formData.address) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      // Update the user profile with the new data
      await updateUserProfile(formData);

      // After update, re-fetch user data and navigate to the new profile URL
      const updatedUserData = await getUserProfile();
      setUser(updatedUserData);
      setFormData({
        username: updatedUserData.username,
        email: updatedUserData.email,
        phone: updatedUserData.phone,
        address: updatedUserData.address,
      });

      // Redirect to the new profile URL (with updated username)
      navigate(`/user/${updatedUserData.username}/profile`);

      setEditMode(false); // Switch back to view mode
    } catch (error) {
      setError('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Return loading state or error state if user data is not available
  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  // Ensure user data exists before rendering
  if (!user) {
    return <div className={styles.error}>User profile not found.</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>User Profile</h2>

      {editMode ? (
        <form onSubmit={handleSubmit} className={styles.profileInfo}>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Phone:</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Address:</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <div className={styles.profileInfo}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;


import React, { useState } from "react";
import styles from "./EditInfo.module.css";

const EditInfo = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated data to the backend
      await updateProduct(formData.id, formData);

      // Call the onSave function to update the table
      onSave(formData);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Oligo Name</label>
            <input
              type="text"
              name="oligoAdi"
              value={formData.oligoAdi}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Scale</label>
            <input
              type="text"
              name="scale"
              value={formData.scale}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Total Price</label>
            <input
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfo;


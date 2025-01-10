import React, { useState, useEffect } from "react";
import { primerData, propData } from "../../../../data/ProductData";
import styles from "./ProductComponent.module.css";

const ProductComponent = ({
  index,
  category,
  productData,
  onRemove,
  onUpdate,
}) => {
  const [data, setData] = useState({ ...productData });

  const getPrice = (category, type, key) => {
    const productInfo = category === "prime" ? primerData : propData;
    if (type === "synthesisScales")
      return productInfo.synthesisScales[key]?.[data.scale] || 0;
    if (type === "fivePrimeModifications")
      return productInfo.fivePrimeModifications[key]?.price || 0;
    if (type === "threePrimeModifications")
      return productInfo.threePrimeModifications[key]?.price || 0;
    return 0;
  };

  const calculateTotalPrice = () => {
    let price = 0;
    if (category === "prime" && data.saflaştırma) {
      price += getPrice(category, "synthesisScales", data.saflaştırma);
    }
    if (data.modifications.fivePrime) {
      price += getPrice(
        category,
        "fivePrimeModifications",
        data.modifications.fivePrime
      );
    }
    if (data.modifications.threePrime) {
      price += getPrice(
        category,
        "threePrimeModifications",
        data.modifications.threePrime
      );
    }
    return price;
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    if (totalPrice !== data.totalPrice) {
      const updatedData = { ...data, totalPrice };
      setData(updatedData);
      onUpdate(updatedData, index);
    }
  }, [
    data.modifications,
    data.saflaştırma,
    data.scale,
    data.oligoAdi,
    data.sekans,
    data.uzunluk,
  ]);

  return (
    <div className={styles.productComponent}>
      <div className={styles.productHeader}>
        <div className={styles.header}>
          <input
            type="checkbox"
            checked={data.selected}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                selected: e.target.checked,
              }))
            }
          />
          <label>Select</label>
          <h4 style={{ paddingLeft: "10px" }}>
            {category === "prime" ? "   Prime Product" : "   Prop Product"}
          </h4>
        </div>

        <div className={styles.totalPrice}>
          Total Price: {data.totalPrice.toFixed(2)} €
        </div>
      </div>

      <div className={styles.productForm}>
        <div className={styles.formGroupUp}>
          <div className={styles.formGroup}>
            <label>5' Modification:</label>
            <select
              value={data.modifications.fivePrime}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  modifications: {
                    ...prev.modifications,
                    fivePrime: e.target.value,
                  },
                }))
              }
            >
              <option value="">Select</option>
              {Object.keys(
                category === "prime"
                  ? primerData.fivePrimeModifications
                  : propData.fivePrimeModifications
              ).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>3' Modification:</label>
            <select
              value={data.modifications.threePrime}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  modifications: {
                    ...prev.modifications,
                    threePrime: e.target.value,
                  },
                }))
              }
            >
              <option value="">Select</option>
              {Object.keys(
                category === "prime"
                  ? primerData.threePrimeModifications
                  : propData.threePrimeModifications
              ).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {category === "prime" && (
            <div className={styles.formGroup}>
              <label>Purification:</label>
              <select
                value={data.saflaştırma}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    saflaştırma: e.target.value,
                  }))
                }
              >
                {["DSLT", "OPC", "HPLC"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Synthesis Scale:</label>
            <select
              value={data.scale}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  scale: e.target.value,
                }))
              }
            >
              {["50 nmol", "100 nmol", "200 nmol"].map((scale) => (
                <option key={scale} value={scale}>
                  {scale}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formGroupDown}>
          <div className={styles.formGroup}>
            <label>Oligo Name:</label>
            <input
              type="text"
              value={data.oligoAdi}
              onChange={(e) => {
                const updatedData = { ...data, oligoAdi: e.target.value };
                setData(updatedData);
                onUpdate(updatedData, index);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Sekans:</label>
            <input
              type="text"
              value={data.sekans || ""}
              onChange={(e) => {
                const updatedData = { ...data, sekans: e.target.value };
                setData(updatedData);
                onUpdate(updatedData, index);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Uzunluk:</label>
            <input
              type="number"
              value={data.uzunluk || 0}
              onChange={(e) => {
                const updatedData = { ...data, uzunluk: e.target.value };
                setData(updatedData);
                onUpdate(updatedData, index);
              }}
            />
          </div>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;

import React from "react";
import { PulseLoader } from "react-spinners";
import styles from "../_styles/productList.module.scss";
export const ProductLoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <PulseLoader size={20} margin={10} color="#64d8fe" />
      <p>상품을 가져오고 있습니다.</p>
    </div>
  );
};

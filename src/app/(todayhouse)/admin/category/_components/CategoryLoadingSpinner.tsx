import React from "react";
import { PulseLoader } from "react-spinners";
import styles from "../_styles/categorylist.module.scss";

function CategoryLoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <PulseLoader size={10} margin={5} color="#64d8fe" />
    </div>
  );
}

export default CategoryLoadingSpinner;

import React from "react";
import { BarLoader } from "react-spinners";
import styles from "../_styles/mswLoading.module.scss";

export const MswLoadingSpinner = () => {
  return (
    <div className={styles.spinnerWrap}>
      <BarLoader color="#64d8fe" width={200} />
      <h2>MSW를 실행하고 있습니다.</h2>
    </div>
  );
};

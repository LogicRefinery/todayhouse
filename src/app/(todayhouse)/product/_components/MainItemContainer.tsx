import React from "react";
import MainItem from "./MainItem";
import Event from "./Event";
import styles from "../_styles/mainItem.module.scss";

function MainItemContainer() {
  return (
    <div className={styles.mainItemContainerWrap}>
      <div className={styles.mainItemContainerInner}>
        <MainItem></MainItem>
        <Event></Event>
      </div>
    </div>
  );
}

export default MainItemContainer;

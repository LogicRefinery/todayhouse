"use client";
import React, { useState } from "react";
import Search from "./Search";
import CategoryList from "./CategoryList";
import ActionBtnGroup from "./ActionBtnGroup";
import styles from "../_styles/container.module.scss";

export const CategoryContainer = () => {
  //상태관리
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [checkboxes, setCheckboxes] = useState<string[]>([]);

  return (
    <section className={styles.category}>
      <div className={styles.inner}>
        <h2 className={styles.srOnly}>카테고리</h2>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryList
          searchTerm={searchTerm}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
        />
        <ActionBtnGroup
          searchTerm={searchTerm}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
        />
      </div>
    </section>
  );
};

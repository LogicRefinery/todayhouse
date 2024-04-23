"use client";
import React from "react";
import CategoryArticle from "./CategoryArticle";
import { useQueryGetData } from "../../admin/_hooks/ReactQuery";
import { Category } from "@/model/category";
import styles from "../_styles/categoryArticle.module.scss";
import { ProductSpinner } from "./ProductSpinner";

function CategoryArticleContainer() {
  const { data, isLoading } = useQueryGetData({
    queryKey: ["admin", "category"],
    requestUrl: "/api/admin/category",
    gcTime: 120000,
    staleTime: 60000,
  });

  return (
    <section className={styles.categoryArticleWrap}>
      <h3 className="sr-only">카테고리 별 상품</h3>
      <div className={styles.categoryArticleInner}>
        {isLoading ? (
          <div className={styles.spinnerWrap}>
            <ProductSpinner />
            <p>상품을 가져오고 있습니다.</p>
          </div>
        ) : (
          data &&
          data.map((category: Category) => (
            <CategoryArticle key={category.id} category={category} />
          ))
        )}
      </div>
    </section>
  );
}

export default CategoryArticleContainer;

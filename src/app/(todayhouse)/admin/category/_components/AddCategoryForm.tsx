"use client";

import { v4 as uuid } from "uuid";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCreateCategories } from "../../_hooks/ReactQuery";
import styles from "../_styles/modal.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryList } from "@/model/category";
function CategoryForm() {
  const [categoryName, setCategoryName] = useState<string>("");
  const queryClient = useQueryClient();
  const categoryInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (categoryInput.current) {
      categoryInput.current.focus();
    }
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value.trim());
  };
  const resetCategoryName = () => {
    setCategoryName("");
  };
  const queryKey = ["admin", "category"];

  const createMutation = useCreateCategories({
    queryKey,
    resetCategoryName,
  });

  const isCategoryNameDuplicate = () => {
    const categories = queryClient.getQueryData(queryKey) as CategoryList;
    const isDuplicate = categories.find((category) => {
      return category.name === categoryName;
    });

    if (!!isDuplicate) {
      alert(
        `중복된 카테고리가 있습니다. 카테고리를 확인해주세요.\n중복 카테고리 : ${isDuplicate.name}`
      );
      return false;
    } else {
      createMutation.mutation.mutate({ id: uuid(), categoryName });
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isCategoryNameDuplicate();
        }}
      >
        <fieldset>
          <legend>카테고리 추가 폼</legend>
          <label htmlFor={styles.categoryName}>카테고리명</label>
          <input
            type="text"
            id={styles.categoryName}
            placeholder="추가할 카테고리를 입력해 주세요."
            onChange={onChange}
            ref={categoryInput}
            value={categoryName}
            required
          />
          <button type="submit" className={styles.addBtn}>
            추가
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default CategoryForm;

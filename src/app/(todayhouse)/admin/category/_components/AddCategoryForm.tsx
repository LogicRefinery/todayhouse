"use client";

import { v4 as uuid } from "uuid";
import { ChangeEvent, useState } from "react";
import { useCreateCategories } from "../../_hooks/ReactQuery";
import styles from "../_styles/modal.module.scss";
function CategoryForm() {
  const [categoryName, setCategoryName] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value.trim());
  };
  const resetCategoryName = () => {
    setCategoryName("");
  };
  const queryKey = ["category", "list"];

  const createMutation = useCreateCategories({
    queryKey,
    resetCategoryName,
  });

  // const queryClient = useQueryClient();

  // const createMutation = useMutation({
  //   mutationFn: async ({ id }: { id: string }) => {
  //     const res = await fetch("/api/admin/category", {
  //       method: "POST",
  //       cache: "no-store",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id, name: categoryName }),
  //     });
  //     return await res.json();
  //   },

  //   onMutate() {},
  //   onSuccess(response: Category, variable) {
  //     setCategoryName("");
  //     queryClient.invalidateQueries({
  //       queryKey: ["category", "list"],
  //       refetchType: "active",
  //     });
  //   },
  // });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMutation.mutation.mutate({ id: uuid(), categoryName });
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

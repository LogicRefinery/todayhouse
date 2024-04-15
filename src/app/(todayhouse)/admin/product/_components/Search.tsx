"use client";

import { Category } from "@/model/category";
import styles from "../_styles/actionBtnGroup.module.scss";
import { useQueryGetData } from "../../_hooks/ReactQuery";

function Search({ onSearch }: { onSearch: (category: string) => void }) {
  const { data } = useQueryGetData({
    queryKey: ["admin", "category"],
    requestUrl: "/api/admin/category",
    staleTime: 60 * 1000,
    gcTime: 60 * 2000,
  });

  return (
    <form>
      <fieldset>
        <legend className="sr-only">카테고리별 분류</legend>
        <label htmlFor={styles.selectCategory}>카테고리 선택</label>
        <select
          defaultValue={""}
          id={styles.selectCategory}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        >
          <option value="">전체</option>
          {data ? (
            data.map((category: Category) => (
              <option
                key={category.id}
                value={JSON.stringify({
                  categoryName: category.name,
                  categoryId: category.id,
                })}
              >
                {category.name}
              </option>
            ))
          ) : (
            <option>loading...</option>
          )}
        </select>
      </fieldset>
    </form>
  );
}

export default Search;

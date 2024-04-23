"use client";
import styles from "../_styles/categorylist.module.scss";
import { Category } from "../../../../../model/category";
import { useQueryGetData } from "../../_hooks/ReactQuery";
import CategoryLoadingSpinner from "./CategoryLoadingSpinner";

type Props = {
  searchTerm: string;
  onChange: ({ id }: { id: string }) => void;
};

function CategoryList({ searchTerm, onChange }: Props) {
  const queryKey = searchTerm
    ? ["admin", "category", searchTerm]
    : ["admin", "category"];

  const requestUrl = searchTerm
    ? `/api/admin/category?search=${encodeURIComponent(searchTerm)}`
    : "/api/admin/category"; //encodeURIComponent : 함수는 URI의 특정 문자를 인코딩하여 URL에 안전하게 포함될 수 있도록 합니다.

  const { data, isLoading } = useQueryGetData({
    queryKey,
    requestUrl,
    gcTime: 120000,
    staleTime: 60000,
  });

  return (
    <div className={styles.wrap}>
      <form>
        <fieldset>
          <legend>카테고리 목록</legend>
          <ul className={`${styles.ul} ${searchTerm ? styles.active : ""}`}>
            {isLoading ? (
              <CategoryLoadingSpinner />
            ) : data && data.length > 0 ? (
              data?.map((category: Category) => (
                <li key={category.id}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    id={category.id}
                    name={category.id}
                    onChange={(e) => {
                      onChange({ id: e.target.id });
                    }}
                  />
                  <label htmlFor={category.id}>{category.name}</label>
                </li>
              ))
            ) : (
              <li>등록된 카테고리가 없습니다. 카테고리를 등록해주세요.</li>
            )}
          </ul>
        </fieldset>
      </form>
    </div>
  );
}

export default CategoryList;

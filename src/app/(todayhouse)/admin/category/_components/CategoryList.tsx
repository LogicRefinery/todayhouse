"use client";
import styles from "../_styles/categorylist.module.scss";
import { Category } from "../../../../../model/category";
import { useQuery } from "@tanstack/react-query";

type Props = {
  searchTerm: string;
  checkboxes: string[];
  setCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
};

function CategoryList({ searchTerm, checkboxes, setCheckboxes }: Props) {
  const onChange = ({ id }: { id: string }) => {
    const isChecked = checkboxes.includes(id);
    const newCheckboxes = isChecked
      ? checkboxes.filter((checkboxId) => checkboxId !== id) // 이미 체크된 상태면 해당 id를 배열에서 제거
      : [...checkboxes, id]; // 체크되지 않은 상태면 해당 id를 배열에 추가
    setCheckboxes(newCheckboxes);
  };

  const { data } = useQuery({
    queryKey: searchTerm
      ? ["category", "list", searchTerm]
      : ["category", "list"],
    queryFn: async () => {
      const res = await fetch(
        searchTerm
          ? `/api/admin/category?search=${encodeURIComponent(searchTerm)}`
          : "/api/admin/category", //encodeURIComponent : 함수는 URI의 특정 문자를 인코딩하여 URL에 안전하게 포함될 수 있도록 합니다.
        {
          method: "GET",
        }
      );
      return await res.json();
    },
    staleTime: 15000, //정해진 시간만큼 fresh, stale 상태로 넘어가면 재요청.
    gcTime: 20000, //inactive 상태로 정해진 시간이 지나면 아예 메모리에서 삭제.
  });
  return (
    <div className={styles.wrap}>
      <form>
        <fieldset>
          <legend>카테고리 목록</legend>
          <ul className={`${styles.ul} ${searchTerm ? styles.active : ""}`}>
            {data &&
              data.map((category: Category) => (
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
              ))}
          </ul>
        </fieldset>
      </form>
    </div>
  );
}

export default CategoryList;

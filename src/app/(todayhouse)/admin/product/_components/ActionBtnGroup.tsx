"use client";
import AddProductBtn from "./AddProductBtn";
import Search from "./Search";
import styles from "../_styles/actionBtnGroup.module.scss";
import { CheckState } from "@/model/product";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteImages, useDeleteProduct } from "../../_hooks/ReactQuery";

function ActionBtnGroup({
  checkboxes,
  resetCheckboxes,
  onSearch,
}: {
  checkboxes: CheckState;
  resetCheckboxes: () => void;
  onSearch: (category: string) => void;
}) {
  //체크박스 상태를 가지고 삭제를 구현하자.
  //기본빵으로 전체, 검색어가 있다면 검색어까지 해야됨.
  // ["category", "list"], ["category", "list",'검색어'] 두 쿼리를 변경해야됨.
  //  const queryKeys = { queryKey: ["admin", "products"], searchTerm };
  const queryClient = useQueryClient();
  const queryKeys = { queryKey: ["admin", "products"] };
  const imageQueryKeys = { queryKey: ["admin", "products", "images"] };

  const deleteMutation = useDeleteProduct(queryKeys);
  const imageDeleteMutation = useDeleteImages(imageQueryKeys);

  const deleteProduct = () => {
    if (checkboxes.checked.length < 1) {
      alert("삭제할 상품이 선택되지 않았습니다.");
      return false;
    }

    if (confirm("삭제한 상품은 복구가 불가능합니다. 정말 삭제하시겠습니까?")) {
      deleteMutation.mutation.mutate(checkboxes);
      imageDeleteMutation.mutation.mutate(checkboxes);
      resetCheckboxes();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <Search onSearch={onSearch} />
        <AddProductBtn />
        <button onClick={deleteProduct}>선택삭제</button>
      </div>
    </div>
  );
}

export default ActionBtnGroup;

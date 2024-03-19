import { Category, CategoryList } from "@/model/category";
import AddCategoryBtn from "./AddCategoryBtn";
import { useQueryClient } from "@tanstack/react-query";
import styles from "../_styles/actionBtnGroup.module.scss";
import { useDeleteCategories } from "../../_hooks/ReactQuery";

type Props = {
  searchTerm: string;
  checkboxes: string[] | [];
  resetChecked: () => void;
};

function ActionBtnGroup({ searchTerm, checkboxes, resetChecked }: Props) {
  const queryClient = useQueryClient();

  //기본빵으로 전체, 검색어가 있다면 검색어까지 해야됨.
  // ["category", "list"], ["category", "list",'검색어'] 두 쿼리를 변경해야됨.
  const queryKeys = { queryKey: ["category", "list"], searchTerm };

  const deleteMutation = useDeleteCategories(queryKeys);

  const deleteCategory = () => {
    if (checkboxes.length < 1) {
      alert("삭제 할 카테고리를 선택해주세요.");
      return false;
    }

    if (
      confirm("삭제한 카테고리는 복구가 불가능합니다. 정말 삭제하시겠습니까?")
    ) {
      deleteMutation.mutation.mutate(checkboxes);
      resetChecked();
    }
  };

  const deleteAllCategory = () => {
    if (
      confirm("삭제한 카테고리는 복구가 불가능합니다. 정말 삭제하시겠습니까?")
    ) {
      const allCategories = queryClient.getQueryData([
        "category",
        "list",
      ]) as CategoryList;
      const allCategoryIds = allCategories.map(
        (category: Category) => category.id
      );

      deleteMutation.mutation.mutate(allCategoryIds);
    }
  };

  return (
    <div className={styles.wrap}>
      <AddCategoryBtn />
      <button onClick={deleteCategory}>선택삭제</button>
      <button onClick={deleteAllCategory}>전체삭제</button>
    </div>
  );
}

export default ActionBtnGroup;

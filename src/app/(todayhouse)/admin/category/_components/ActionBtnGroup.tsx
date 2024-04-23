import { Category, CategoryList } from "@/model/category";
import AddCategoryBtn from "./AddCategoryBtn";
import { useQueryClient } from "@tanstack/react-query";
import styles from "../_styles/actionBtnGroup.module.scss";
import { useDeleteCategories, useQueryGetData } from "../../_hooks/ReactQuery";
import { Product } from "@/model/product";

type Props = {
  searchTerm: string;
  checkboxes: string[] | [];
  resetChecked: () => void;
};

function ActionBtnGroup({ searchTerm, checkboxes, resetChecked }: Props) {
  const queryClient = useQueryClient();
  const queryKeys = { queryKey: ["admin", "category"], searchTerm };

  const productQuery = {
    queryKey: ["admin", "products"],
    requestUrl: "/api/admin/product",
    gcTime: 6 * 10000,
    staleTime: 12 * 10000,
  };
  const { data, isLoading } = useQueryGetData(productQuery);
  const deleteMutation = useDeleteCategories(queryKeys);

  const deleteCategory = () => {
    if (checkboxes.length < 1) {
      alert("삭제 할 카테고리를 선택해주세요.");
      return false;
    }

    const confirmed = confirm(
      "삭제한 카테고리는 복구가 불가능합니다. 정말 삭제하시겠습니까?"
    );

    if (confirmed) {
      const failedDelete =
        data &&
        data.some((product: Product) =>
          checkboxes.includes(product.categoryInfo.categoryId as never)
        );

      if (failedDelete) {
        const failedDeleteCategoryList = data
          .filter((product: Product) =>
            checkboxes.includes(product.categoryInfo.categoryId as never)
          )
          .map((product: Product) => product.categoryInfo.categoryName);

        const uniqueFailedDeleteCategoryList = Array.from(
          new Set(failedDeleteCategoryList)
        );
        alert(
          `삭제할 카테고리에 상품이 등록되어있습니다. 상품을 제거하고 카테고리를 삭제해주세요.\n\n상품이 등록되어있는 카테고리 : ${JSON.stringify(
            uniqueFailedDeleteCategoryList
          )}`
        );
        return false;
      } else {
        deleteMutation.mutation.mutate(checkboxes);
        resetChecked();
      }
    }
  };

  const deleteAllCategory = () => {
    const allCategories = queryClient.getQueryData([
      "admin",
      "category",
    ]) as CategoryList;

    const allCategoryIds = allCategories.map(
      (category: Category) => category.id
    );

    const confirmed = confirm(
      "삭제한 카테고리는 복구가 불가능합니다. 정말 삭제하시겠습니까?"
    );

    if (confirmed) {
      const failedDelete =
        data &&
        data.some((product: Product) =>
          allCategoryIds.includes(product.categoryInfo.categoryId)
        );

      if (failedDelete) {
        const failedDeleteCategoryList = data
          .filter((product: Product) =>
            allCategoryIds.includes(product.categoryInfo.categoryId as never)
          )
          .map((product: Product) => product.categoryInfo.categoryName);
        const uniqueFailedDeleteCategoryList = Array.from(
          new Set(failedDeleteCategoryList)
        );
        alert(
          `삭제할 카테고리에 상품이 등록되어있습니다. 상품을 제거하고 카테고리를 삭제해주세요.\n\n상품이 등록되어있는 카테고리 : ${JSON.stringify(
            uniqueFailedDeleteCategoryList
          )}`
        );
        return false;
      } else {
        deleteMutation.mutation.mutate(allCategoryIds);
      }
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

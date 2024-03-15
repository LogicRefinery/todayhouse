import { Category, CategoryList } from "@/model/category";
import AddCategoryBtn from "./AddCategoryBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../_styles/actionBtnGroup.module.scss";

type Props = {
  searchTerm: string;
  checkboxes: string[] | [];
  setCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
};

function ActionBtnGroup({ searchTerm, checkboxes, setCheckboxes }: Props) {
  //처음 렌더링했을때 로컬스토리지 데이터만 기억하고있어서.. 다른 방법 찾아야할듯.
  // const allCategoryId = JSON.parse(
  //   localStorage?.getItem("categoryList") as string
  // ).map((category: Category) => category.id);

  const queryClient = useQueryClient();
  const deleteAllMutation = useMutation({
    mutationFn: async (idArr: string[]) => {
      const res = await fetch("http://localhost:9090/admin/category", {
        method: "DELETE",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idArr),
      });

      return res.json();
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["category", "list"] });
      const prevCategory = queryClient.getQueryData([
        "category",
        "list",
      ]) as CategoryList;

      if (prevCategory) {
        queryClient.setQueryData(["category", "list"], []);
      }

      return { prevCategory };
    },
    onError: (error, variables, context) => {
      console.error(
        "에러 발생 : 카테고리 삭제를 실패하였습니다. 삭제 요청한 카테고리 : ",
        variables,
        error
      );
      queryClient.setQueryData(["category", "list"], context?.prevCategory);
    },
    onSuccess: async (response, variables, prev) => {
      //http 요청 실패할수도있으니까 성공하면 로컬스토리지 셋팅
      localStorage.setItem("categoryList", JSON.stringify(response));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (idArr: string[]) => {
      const res = await fetch("http://localhost:9090/admin/category", {
        method: "DELETE",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idArr),
      });

      return res.json();
    },

    onMutate: async (variables) => {
      // cancelQueries 가 디바운싱을 해준다네,,? ( 중복 요청을 막아준대 ㅎㅎ.. )
      // 사용자가 페이지를 매우 빠르게 이동했을 때, mutate 가 요청을 보내는걸 중도 취소할 수 있다.
      // queryClient.cancelQueries 가 하는일이 뭐임 ?
      // 리액트 쿼리가 관리하는 쿼리를 '취소' 한다.
      // http 요청 취소는 있을 수 없다.
      // 리액트 쿼리 상에서 취소 처리 즉, http 요청을 취소할순 없으나 응답을 무시하고, 쿼리캐시에 저장하지 않는다.
      // 빠르게 여러번의 요청이 있을때 마지막 요청만 처리하고, 그 이전의 요청은 무시하는 느낌 ?
      await queryClient.cancelQueries({ queryKey: ["category", "list"] });

      //검색어가 있다면 ? 검색어로 만들어진 쿼리캐시와 , 원래 쿼리 캐시 둘 다 리패치 해야됨
      if (searchTerm) {
        const prevSearchCategory = queryClient.getQueryData([
          "category",
          "list",
          searchTerm,
        ]);
      }
      //http 요청 실패시 롤백을 대비해 기존 캐시의 값을 저장해 둔다.
      const prevCategory = queryClient.getQueryData([
        "category",
        "list",
      ]) as CategoryList;

      //반드시 이전 데이터가 존재해야만 쿼리 업데이트.
      if (prevCategory) {
        const filterCategory = prevCategory.filter(
          (category) => !variables.includes(category.id)
        );
        //쿼리 클라이언트 데이터 셋팅 : 쿼리클라이언트의 쿼리캐시의 데이터가 변경되면 자동으로 UI 도 다시 그려준다.
        queryClient.setQueryData(["category", "list"], filterCategory);
      }
      return { prevCategory };
    },
    onError: (error, variables, context) => {
      console.error(
        "에러 발생 : 카테고리 삭제를 실패하였습니다. 삭제 요청한 카테고리 : ",
        variables,
        error
      );
      queryClient.setQueryData(["category", "list"], context?.prevCategory);
    },
    onSuccess: async (response, variables, prev) => {
      //http 요청 실패할수도있으니까 성공하면 로컬스토리지 셋팅
      localStorage.setItem("categoryList", JSON.stringify(response));
      if (searchTerm) {
        await queryClient.invalidateQueries({
          queryKey: ["category", "list", searchTerm],
        });
      }
    },
  });
  // 검색어가 있을 때 삭제했을때도 해당 검색쿼리 인벨리데이팅 해야됨.
  const deleteCategory = () => {
    if (checkboxes.length < 1) {
      alert("삭제 할 카테고리를 선택해주세요.");
      return false;
    }

    if (
      confirm("삭제한 카테고리는 복구가 불가능합니다. 정말 삭제하시겠습니까?")
    ) {
      deleteMutation.mutate(checkboxes);
      setCheckboxes([]);
    }
  };

  const deleteAllCategory = () => {
    // if (
    //   confirm("삭제한 카테고리는 복구가 불가능합니다. 정말 삭제하시겠습니까?")
    // ) {
    //   deleteAllMutation.mutate(allCategoryId);
    // }
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

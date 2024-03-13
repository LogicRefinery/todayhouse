"use client";

import styles from "../_styles/category.module.scss";
import { Category, CategoryList } from "../../../../../model/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ActionBtnGroup from "./ActionBtnGroup";
import { useState } from "react";

type CategoryAction =
  | { type: "CREATE" }
  | { type: "UPDATE" }
  | { type: "DELETE" };

function CategoryList() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const onChange = ({ id }: { id: string }) => {
    setCheckboxes([...checkboxes, id]);
  };

  const queryClient = useQueryClient();

  //검색 중이라면 ?

  if (searchWord) {
  } else {
  }
  const { data } = useQuery({
    queryKey: ["category", "list"],
    queryFn: async () => {
      const res = await fetch("http://localhost:9090/admin/category", {
        method: "GET",
      });
      return await res.json();
    },
    staleTime: 15000, //정해진 시간만큼 fresh, stale 상태로 넘어가면 재요청.
    gcTime: 20000, //inactive 상태로 정해진 시간이 지나면 아예 메모리에서 삭제.
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
    //onMutate 는 mutate 이벤트가 발생하고 mutationFn 의 요청이 시작되기 전에 실행된다.
    //onMutate : (variables)=>{} 첫번째 인자로 mutationFn 의 인자가 들어온다.
    onMutate: async (variables) => {
      //이건 공부따로하셈
      await queryClient.cancelQueries({ queryKey: ["category", "list"] });

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
    onSuccess: (response, variables, prev) => {
      //http 요청 실패할수도있으니까 성공하면 로컬스토리지 셋팅
      localStorage.setItem("categoryList", JSON.stringify(response));
    },
  });

  const deleteCategory = () => {
    if (checkboxes.length < 1) {
      alert("삭제 할 카테고리를 선택해주세요.");
      return false;
    } else {
      deleteMutation.mutate(checkboxes);
      setCheckboxes([]);
    }
  };

  return (
    <div>
      <ActionBtnGroup
        deleteCategory={deleteCategory}
        setSearchWord={setSearchWord}
        searchWord={searchWord}
      ></ActionBtnGroup>

      <div className={styles.categoryList}>
        <form>
          <fieldset>
            <legend>카테고리 목록 섹션</legend>
            {data &&
              data.map((category: Category) => (
                <div key={category.id}>
                  <input
                    type="checkbox"
                    id={category.id}
                    name={category.id}
                    onChange={(e) => {
                      onChange({ id: e.target.id });
                    }}
                  />
                  <label htmlFor={category.id}>{category.name}</label>
                </div>
              ))}
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default CategoryList;

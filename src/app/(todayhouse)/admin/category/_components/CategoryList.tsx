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
    const isChecked = checkboxes.includes(id);
    const newCheckboxes = isChecked
      ? checkboxes.filter((checkboxId) => checkboxId !== id) // 이미 체크된 상태면 해당 id를 배열에서 제거
      : [...checkboxes, id]; // 체크되지 않은 상태면 해당 id를 배열에 추가
    setCheckboxes(newCheckboxes);
  };

  const queryClient = useQueryClient();

  /*
  
  1. 현재 컴포넌트에서 검색 단어 상태를 관리하고있다.
  2. 단어로 리스트를 필터링 하는 구현이 필요한데. 내가 디바운스를 사용한 이유는 서버와 통신횟수의 제한을 주기 위해서이다.
  3. 이미 받아온 데이터로 필터링 할 수 있으나, 서버에 새로 요청하는것. 이미 받아온 데이터를 가공하는것. 사실 답은 이미 받은데이터 가공하는게 맞는데..

  ------------------------------------------------------------------------------------------------------------------------

  1. 검색 페이지에 맨 처음 진입 시 전체 카테고리 리스트가 보여진다.
  2. 사용자가 입력한 값이 있을 경우 해당 입력값을 기반으로 입력값이 포함된 카테고리 리스트를 출력한다.
  3. 사용자가 값을 입력하고 검색 버튼을 클릭했을 경우 바로 해당 키워드가 포함된 카테고리 리스트를 출력한다.
  4. input에 입력된 값이 아무것도 없을 경우 다시 전체 카테고리를 출력한다.

  값이 없을 때 요청을 안보내면 된다.

  검색 -> 검색어에 관한거 줌
  검색했다가 다지웠음 -> 이때 요청안가면

  
  */

  const { data } = useQuery({
    queryKey: searchWord
      ? ["category", "list", searchWord]
      : ["category", "list"],
    queryFn: async () => {
      const res = await fetch(
        searchWord
          ? `http://localhost:9090/admin/category?search=${encodeURIComponent(
              searchWord
            )}`
          : "http://localhost:9090/admin/category", //encodeURIComponent : 함수는 URI의 특정 문자를 인코딩하여 URL에 안전하게 포함될 수 있도록 합니다.
        {
          method: "GET",
        }
      );
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
    onMutate: async (variables) => {
      // cancelQueries 가 디바운싱을 해준다네,,? ( 중복 요청을 막아준대 ㅎㅎ.. )
      // 사용자가 페이지를 매우 빠르게 이동했을 때, mutate 가 요청을 보내는걸 중도 취소할 수 있다.
      // queryClient.cancelQueries 가 하는일이 뭐임 ?
      // 리액트 쿼리가 관리하는 쿼리를 '취소' 한다.
      // http 요청 취소는 있을 수 없다.
      // 리액트 쿼리 상에서 취소 처리 즉, http 요청을 취소할순 없으나 응답을 무시하고, 쿼리캐시에 저장하지 않는다.
      // 빠르게 여러번의 요청이 있을때 마지막 요청만 처리하고, 그 이전의 요청은 무시하는 느낌 ?
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
      {/* 서치 따로 빼자 ㅎㅎ.. 아니면 이름을 바꾸던가 반드시해줘.. 네이밍에 맞는 컴포넌트 구조를 잘 생각하자 ㅎㅎ */}
      <ActionBtnGroup
        deleteCategory={deleteCategory}
        setSearchWord={setSearchWord}
        searchWord={searchWord}
      ></ActionBtnGroup>
      {/* 
디바운싱 : 정해진 시간안에 새로운 이벤트가 발생하면 정해진 시간 초기화..
쓰로틀링 : 정해진 시간안에 새로운 이벤트가 발생하면 한번씩만 받아줌..

둘 다 반복적인 액션에 대한 제한을 두는 기술

'디바운싱' 검색 시 
디바운싱 : '디바운싱'
쓰로틀링 : '디바','디바운싱'

*/}
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

"use client";

import { v4 as uuid } from "uuid";
import { ChangeEvent, useState } from "react";
import { Category, CategoryList } from "../../../../../model/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CategoryForm() {
  const [categoryName, setCategoryName] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };
  const queryClient = useQueryClient();

  // const { mutate, isLoading 등등 } = useMutation({ mutationFn, Options })
  // CRUD 중 C U D 는 데이터에 변화를 준다는 특징을 가지고있다.
  // useMutate 쓰는 이유 : 데이터 생성,수정,삭제도 있지만, 데이터 선반영 ( 옵티미스틱 업데이트, 낙관적 업데이트 )
  // 클라이언트 : 데이터 생성,수정,삭제 요청 -> 서버 : 요청이 올바르다면 요청 실행 후 결과물 반환 -> 클라이언트 : 받은 응답으로 화면에 반영 / 이 일련의 과정은 비동기로 진행된다.
  // 왜? 요청에 대한 응답이 언제 올지 모르니까. 클라이언트는 멈춰있을 수 없기때문에 다른 처리할것들을 하기위해 비동기로 처리
  // 데이터 생성, 수정, 삭제는 클라이언트 측에서 어떤 요청을 할 지 알고있기 때문에 응답을 기다리지 않고 선반영을 할 수 있다. ( 낙관적 업데이트 )
  // 근데 이게 가능한 이유는? 클라이언트와 서버와의 통신의 특징도 있지만, 클라이언트에서 리액트쿼리가 캐시하고 있는 데이터가 있기 때문에 가능한것.. ㄷㄷ..

  const createMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await fetch("http://localhost:9090/admin/category", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: categoryName }),
      });
      return await res.json();
    },
    /*

    뮤테이션 이후 어떤 쿼리를 수정하는지 어떻게 암? ㅋㅋ
    queryClient.queryCache 에 직접 접근해서 수정하길 원하는 쿼리를 직접 찾아서 getQueryData 로 불러와서 수정하고 setQueryData 로 직접 박아줘야됨
    로컬스토리지 데이터 받아와서 수정해서 넣는거랑 비슷한 맥락임.



    Options : useMutaion.mutate() 함수가 호출되어 실행되면 라이프사이클, 요청에대한 응답 별로 실행할 함수를 받는 속성들이 있습니다.

    onMutate : useMutaion.mutate()의 호출 즉시 실행. 즉, 서버의 결과를 기다리지 않고 요청을 보내자마자 실행됩니다.

    onSuccess : useMutaion.mutate()의 호출에 대한 응답이 Success일 때 실행됩니다.
    
    onSuccess(response, variable, context){}
    onSuccess : () => {}
    
    response : 요청에 대한 결과 값을 받습니다.
    variable : mutationFn 함수의 매개변수를 받습니다.
    context : onMutate 함수의 return 된 값을 받습니다.

    onError : useMutaion.mutate()의 호출에 대한 응답이 Error일 때 실행됩니다.
    onSettled : useMutaion.mutate()의 호출에 대한 응답이 Success, Error 상관 없이 서버에 응답이 있으면 실행됩니다.

     */

    onMutate() {},
    onSuccess(response: Category, variable) {
      // --------------------------------------------------------
      // 성공 했을 때
      // 1.localStorage 에 데이터 추가
      // 2. 쿼리 캐시에 원하는 쿼리 캐시데이터 수정
      const getCategoryFromLocalStorage = (): CategoryList => {
        const localCategory = localStorage.getItem("categoryList");
        if (localCategory) {
          try {
            return JSON.parse(localCategory);
          } catch (error) {
            console.error(
              "로컬스토리지 데이터를 가져오는 중 에러가 발생했습니다.",
              error
            );
          }
        }
        return [];
      };
      //로컬스토리지 받아오기.
      const category = getCategoryFromLocalStorage();
      category.push(response);
      localStorage.setItem("categoryList", JSON.stringify(category));
      //로컬 스토리지에 데이터 추가

      //뮤테이션 요청한 데이터 리액트 쿼리 캐시도 수정하기 위해 리패치 ( 실제로 패치 요청 작동함 )

      queryClient.invalidateQueries({
        queryKey: ["category", "list"],
        refetchType: "active",
      });

      //웹 페이지 로드 ( layout.tsx ) : 로컬스토리지 데이터 get 해서 서버에 post 요청
      //

      //추가 -> 요청 -> 응답 -> 로컬에 저장 -> 리액트쿼리 캐시 업데이트

      //쿼리 리패치 : 리패치 라는게 결국은 http 요청을 한다는 뜻. ( 데이터 새로고침 : 할려면 통신해야됨 ㅋㅋ)
      //만약 쿼리 클라이언트의 리패치 요청이 실패하면 어떻게 처리함 ?
      //연관된 데이터들이 있는경우
      //  ex ) addUser 를 했을 때 useList 가 업데이트 됐다.
      //  연관된 데이터를 컨트롤 하는 방법.
      // --------------------------------------------------------
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMutation.mutate({ id: uuid() });
        }}
      >
        <fieldset>
          <legend>카테고리 추가 폼</legend>
          <label htmlFor="categoryName">카테고리명</label>
          <input
            type="text"
            id="categoryName"
            onChange={(e) => {
              onChange(e);
            }}
            required
          />
          <button type="submit">추가</button>
        </fieldset>
      </form>
    </>
  );
}

export default CategoryForm;

/*
useMutation



mutationFn : 비동기 작업을 수행하는 Promise를 반환하는 함수

구조분해 할당한 mutate 를 호출하면 mutationFn 이 실행된다.


useMutation 훅은 객체를 반환하며 객체에 대한 프로퍼티는 아래와 같습니다.

- mutate: (variables: TVariables, { onSuccess, onSettled, onError }) => void
: mutate 메서드를 호출하면 useMutation 훅 첫 번째 인수로 전달한 콜백함수가 실행되며, 호출 시 전달한 인수가 첫 번째 콜백함수에게 전달됩니다.

mutate 메서드 인수로 객체 타입만을 전달할 수 있으며 mutateFn이 전달받는 인수 또한 객체 타입입니다.

- mutateAsync: (variables: TVariables, { onSuccess, onSettled, onError }) => Promise<TData>
: mutate 메서드와 동일하지만 차이점으로는 Promise 객체를 반환합니다.

- isLoading: boolean
: mutation이 진행중인 경우 true 값을 갖습니다.

- isError: boolean
: mutation이 실패한 경우 true 값을 갖습니다.

- isSuccess: boolean
: mutation이 성공한 경우 true 값을 갖습니다.


invalidateQuery
queryClient가 제공하는 메서드 중 invalidateQuery 메서드는 특정 쿼리 데이터를 명시적으로 무효화해주는 역할을 합니다.

여기서 무효화란 쿼리의 staleTime을 0으로 만들어줌으로서 React Query가 re-fethcing하도록 만들어줍니다.

일반적으로 Mutations로 변경된 쿼리에 대해 쿼리의 staleTime을 0으로 만들어 주고, React Query가 이를 re-fetching 하도록 만들기 위해 사용합니다.
*/

// const mutationFn = async()=> {
//  const res = await fetch("http://localhost:9090/admin/category", {
//    method: "POST",
//    headers: { "Content-Type": "application/json" },
//    body: "서버로 보낼 데이터 ( 업데이트 할 데이터 )",
//  });
//  return await res.json();
// }

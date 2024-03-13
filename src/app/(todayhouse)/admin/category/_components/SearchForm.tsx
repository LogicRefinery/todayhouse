"use client";

import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

function SearchForm({
  setSearchWord,
  searchWord,
}: {
  setSearchWord: Dispatch<SetStateAction<string>>;
  searchWord: string;
}) {
  /*
  서버에 API를 요청하지 않지만 디바운스를 구현해보자.

  검색어 입력시 데이터를 필터링해야한다. 검색어로.
  
  검색어 상태는 어디서 관리할래 ?
  
  검색어 상태로 리액트 쿼리의 data 를 컨트롤 해야되는데 그게 여기서 돼 ? 검색어가 없을땐 원래 상태로 돌아와야되는데..

  검색어 상태를 상위 컴포넌트에서 관리한다 쳐도 그게 맞아? 왜냐면 이 컴포넌트 이름 서치 폼..

  
  */

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>검색어 입력</legend>
          <label htmlFor="searchCategory">검색라벨</label>
          <input
            type="text"
            id="searchCategory"
            placeholder="검색어 입력"
            onChange={onChange}
          ></input>
        </fieldset>
      </form>
    </>
  );
}

export default SearchForm;

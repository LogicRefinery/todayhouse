"use client";

import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
type TimerId = ReturnType<typeof setTimeout>;

/*
  검색할때 요청을 새로할지,
  검색해서 받아온거를 그냥 프론트에서 딥카피해서 모양만 보여줄지.

*/

function SearchForm({
  setSearchWord,
  searchWord,
}: {
  setSearchWord: Dispatch<SetStateAction<string>>;
  searchWord: string;
}) {
  const debounce = (
    callback: (e: ChangeEvent<HTMLInputElement>) => void,
    delay: number
  ) => {
    let timerId: TimerId | null = null;

    return (e: ChangeEvent<HTMLInputElement>) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(e);
      }, delay);
    };
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const onChange = debounce(onSearch, 500);

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

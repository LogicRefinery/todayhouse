"use client";

import { FormEvent } from "react";
import styles from "../_styles/search.module.scss";

type TimerId = ReturnType<typeof setTimeout>;
type Prop = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
};
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

function SearchForm({ searchTerm, setSearchTerm }: Prop) {
  const debounce = (callback: (e: ChangeEvent) => void, delay: number) => {
    let timerId: TimerId | null = null;

    return (e: ChangeEvent) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(e);
      }, delay);
    };
  };

  const onSearch = (e: ChangeEvent) => {
    setSearchTerm(e.target.value);
  };

  const onChange = debounce(onSearch, 500);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.form}>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>검색어 입력</legend>
          <label htmlFor="searchCategory">검색라벨</label>
          <input
            className={`${styles.searchCategory} ${
              searchTerm ? styles.active : ""
            }`}
            type="text"
            id="searchCategory"
            placeholder="검색어를 입력해 주세요."
            onChange={onChange}
          ></input>
        </fieldset>
      </form>
    </div>
  );
}

export default SearchForm;

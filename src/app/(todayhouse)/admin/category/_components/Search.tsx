"use client";

import { ChangeEvent, FormEventHandler } from "react";
import styles from "../_styles/search.module.scss";
import { DebouncedFunc } from "lodash";
type Props = {
  searchTerm: string;
  onChange: DebouncedFunc<(e: ChangeEvent) => void>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};
function Search({ searchTerm, onChange, onSubmit }: Props) {
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

export default Search;

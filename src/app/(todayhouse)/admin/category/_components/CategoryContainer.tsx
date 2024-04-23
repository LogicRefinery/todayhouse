"use client";
import React, { FormEvent, useState } from "react";
import Search from "./Search";
import CategoryList from "./CategoryList";
import ActionBtnGroup from "./ActionBtnGroup";
import styles from "../_styles/container.module.scss";
import { debounce } from "lodash";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const CategoryContainer = () => {
  //상태관리
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [checkboxes, setCheckboxes] = useState<string[]>([]);

  /*
  트리쉐이킹 : 모듈의 일부분만 사용한다면, 사용하는 모듈 부분을 제외한 다머지 모듈을 털어내고 배포한다. ( 제거한다 )
  트리쉐이킬은 웹팩같은 번들러가 해준다. 

  이 코드를 라이브러리로 변경
  const debounce = (callback: (e: ChangeEvent) => void, delay: number) => {
    let timerId: TimerId | null = null;

    return (e: ChangeEvent) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(e);
      }, delay);
    };
  };
   */

  const searchOnSearch = (e: ChangeEvent) => {
    setSearchTerm(e.target.value);
  };
  const searchOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const searchOnChange = debounce(searchOnSearch, 500); //lodash 라이브러리 사용

  const categoryListOnChange = ({ id }: { id: string }) => {
    const isChecked = checkboxes.includes(id);
    const newCheckboxes = isChecked
      ? checkboxes.filter((checkboxId) => checkboxId !== id) // 이미 체크된 상태면 해당 id를 배열에서 제거
      : [...checkboxes, id]; // 체크되지 않은 상태면 해당 id를 배열에 추가
    setCheckboxes(newCheckboxes);
  };

  const resetChecked = () => {
    setCheckboxes([]);
  };

  return (
    <section className={styles.category}>
      <div className={styles.inner}>
        <h2 className={styles.srOnly}>카테고리</h2>
        <Search
          searchTerm={searchTerm}
          onChange={searchOnChange}
          onSubmit={searchOnSubmit}
        />
        <CategoryList searchTerm={searchTerm} onChange={categoryListOnChange} />
        <ActionBtnGroup
          searchTerm={searchTerm}
          checkboxes={checkboxes}
          resetChecked={resetChecked}
        />
      </div>
    </section>
  );
};

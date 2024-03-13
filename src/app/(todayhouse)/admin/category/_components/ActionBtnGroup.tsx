import { Dispatch, SetStateAction } from "react";
import styles from "../_styles/category.module.scss";
import AddCategoryBtn from "./AddCategoryBtn";
import SearchForm from "./SearchForm";

function ActionBtnGroup({
  deleteCategory,
  setSearchWord,
  searchWord,
}: {
  deleteCategory: () => void;
  setSearchWord: Dispatch<SetStateAction<string>>;
  searchWord: string;
}) {
  return (
    <div className={styles.actionBtn}>
      <SearchForm
        setSearchWord={setSearchWord}
        searchWord={searchWord}
      ></SearchForm>
      <AddCategoryBtn />
      <button onClick={deleteCategory}>선택삭제</button>
      {/* <button>전체삭제</button> */}
    </div>
  );
}

export default ActionBtnGroup;

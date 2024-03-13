import CategoryList from "./_components/CategoryList";
import styles from "./_styles/category.module.scss";

const Page = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <CategoryList />
      </div>
    </div>
  );
};

export default Page;

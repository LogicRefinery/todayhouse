import Link from "next/link";
import styles from "./_styles/main.module.scss";

export default function Page() {
  return (
    <main className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2>ThMall 에 오신것을 환영합니다.</h2>
        </div>
        <div className={styles.nav}>
          <nav>
            <ul>
              <li>
                <Link href={"/admin/category"}>Admin</Link>
                <p>제품 및 카테고리 관리</p>
              </li>
              <li>
                <Link href={"/product"}>Product</Link>
                <p>제품 구매</p>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../_styles/nav.module.scss";

function Nav() {
  const currentPath = usePathname();

  return (
    <nav>
      <div className={styles.inner}>
        <ul>
          <li>
            <Link
              href={"/admin/category"}
              className={
                currentPath === "/admin/category" ? styles.active : undefined
              }
            >
              category
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/product"}
              className={
                currentPath === "/admin/product" ? styles.active : undefined
              }
            >
              product
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

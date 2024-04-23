"use client";
import React from "react";
import { useQueryGetData } from "../../admin/_hooks/ReactQuery";
import { Category } from "@/model/category";
import Link from "next/link";
import TrendingKeywords from "./TrendingKeywords";
import styles from "../_styles/nav.module.scss";
import { useParams } from "next/navigation";

function Nav() {
  const { data, isLoading } = useQueryGetData({
    queryKey: ["admin", "category"],
    requestUrl: "/api/admin/category",
    gcTime: 120000,
    staleTime: 60000,
  });

  const params = useParams();

  const currentPath =
    params.category === "undefined"
      ? "/product"
      : `/product/${params.category}`;

  return (
    <>
      <div className={styles.navWrap}>
        <div className={styles.navInner}>
          <nav className={styles.nav}>
            <ul className={styles.navUl}>
              <li>
                <Link
                  href={`/product`}
                  className={
                    currentPath === "/product/undefined"
                      ? styles.active
                      : "undefined"
                  }
                >
                  홈
                </Link>
              </li>

              {isLoading
                ? "카테고리 목록 로딩중 .."
                : data &&
                  data.map((category: Category) => {
                    return (
                      <li key={category.id}>
                        <Link
                          href={`/product/${encodeURIComponent(category.id)}`}
                          className={
                            currentPath === `/product/${category.id}`
                              ? styles.active
                              : "undefined"
                          }
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </nav>
          <TrendingKeywords />
        </div>
      </div>
    </>
  );
}

export default Nav;

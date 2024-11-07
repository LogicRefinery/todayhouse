import React from "react";
import Image from "next/image";
import styles from "../_styles/mainItem.module.scss";
import Link from "next/link";

function MainItem() {
  return (
    <div className={styles.mainItem}>
      <Link href="#">
        <div className={styles.mainItemImage}>
          <Image
            src={"/productMain.jpeg"}
            alt={"오늘의 인기 아이템 !"}
            sizes="(max-width:1200px) 80vw, 60vw"
            fill
            priority
          />
        </div>
        <div className={styles.mainItemDescription}>
          <p>패브릭으로 완성한 폭닥폭닥 포근함</p>
          <p>xoguddkenl</p>
        </div>
      </Link>
    </div>
  );
}

export default MainItem;

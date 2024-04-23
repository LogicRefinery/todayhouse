import React from "react";
import styles from "../_styles/mainItem.module.scss";
import Link from "next/link";
import Image from "next/image";

function Event() {
  return (
    <div className={styles.event}>
      <Link href="#">
        <Image
          src={"/event.jpeg"}
          alt={"이벤트배너"}
          height={0}
          width={0}
          sizes="100vw"
        ></Image>
      </Link>
    </div>
  );
}

export default Event;

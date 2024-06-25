import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "../_styles/header.module.scss";

const Header = () => {
  return (
    <header className={styles.wrap}>
      <div className={styles.inner}>
        <h1>
          <Link href={"/"}>
            <FontAwesomeIcon icon={faHouse} />
            THMall
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;

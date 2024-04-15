import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../_styles/modal.module.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import AddCategoryForm from "./AddCategoryForm";

function Modal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>카테고리 추가</div>
          </div>
          <div className={styles.body}>
            <div>
              추가된 카테고리는 관리자의 페이지와 사용자의 페이지에서
              사용됩니다.
            </div>
            <AddCategoryForm />
          </div>
          <div className={styles.footer}>
            <button onClick={onClose} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;

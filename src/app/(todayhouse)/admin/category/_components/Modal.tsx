import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../_styles/modal.module.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import AddCategoryForm from "./AddCategoryForm";

function Modal({
  onClose,
  showModal,
}: {
  onClose: () => void;
  showModal: boolean;
}) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>카테고리 추가</div>
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
          <div className={styles.body}>
            <AddCategoryForm />
          </div>
          <div className={styles.footer}>푸터</div>
        </div>
      </div>
    </>
  );
}

export default Modal;

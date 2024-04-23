import styles from "../_styles/modal.module.scss";
import AddProductForm from "./AddProductForm";
import ModifyProductForm from "./ModifyProductFrom";

type Prop = {
  showModal: boolean;
  onClose: () => void;
  mode: string;
  productId: string;
};
function Modal({ showModal, onClose, mode, productId }: Prop) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.header}>
            {mode === "add" ? <div>상품 추가</div> : <div>상품 수정</div>}
          </div>
          <div className={styles.body}>
            {mode === "add" ? (
              <>
                <div>
                  추가된 상품은 관리자의 페이지와 사용자의 페이지에서
                  사용됩니다.
                </div>
                <AddProductForm></AddProductForm>
              </>
            ) : (
              <ModifyProductForm
                productId={productId}
                onClose={onClose}
              ></ModifyProductForm>
            )}
          </div>
          <div className={styles.footer}>
            <button className={styles.closeBtn} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;

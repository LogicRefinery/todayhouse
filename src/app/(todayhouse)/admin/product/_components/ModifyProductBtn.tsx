"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import styles from "../_styles/productList.module.scss";

function ModifyProductBtn({ productId }: { productId: string }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button
        className={styles.editProductBtn}
        onClick={() => {
          setShowModal(true);
        }}
      >
        수정
      </button>
      {showModal &&
        createPortal(
          <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            mode="modify"
            productId={productId}
          />,
          document.body
        )}
    </>
  );
}

export default ModifyProductBtn;

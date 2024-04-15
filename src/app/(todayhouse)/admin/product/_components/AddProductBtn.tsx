"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

function AddCategoryBtn() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        상품 추가
      </button>
      {showModal &&
        createPortal(
          <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            mode="add"
            productId=""
          />,
          document.body
        )}
    </>
  );
}

export default AddCategoryBtn;

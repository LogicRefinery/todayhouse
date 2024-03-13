"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

function AddCategoryBtn() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        카테고리 추가
      </button>
      {showModal &&
        createPortal(
          <Modal showModal={showModal} onClose={() => setShowModal(false)} />,
          document.body
        )}
    </div>
  );
}

export default AddCategoryBtn;

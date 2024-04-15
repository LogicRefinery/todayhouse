"use client";
import { useEffect, useState } from "react";
import ActionBtnGroup from "./ActionBtnGroup";
import { ProductList } from "./ProductList";
import { CheckState, CheckedItem } from "@/model/product";

export default function ProductContainer() {
  const [checkboxes, setCheckboxes] = useState<CheckState>({ checked: [] });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onSearch = (category: string) => {
    const categoryJson = category ? JSON.parse(category) : "";
    const categoryId = categoryJson.categoryId;

    setSearchTerm(categoryId);
  };

  const checkToggle = ({ productId, productImagesId }: CheckedItem) => {
    const toggleItem: CheckedItem = {
      productId,
      productImagesId,
    };

    const isChecked = checkboxes.checked.find(
      (item) =>
        item.productId === toggleItem.productId &&
        item.productImagesId === toggleItem.productImagesId
    );

    isChecked
      ? setCheckboxes((prev) => ({
          ...prev,
          checked: prev.checked.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.productImagesId === productImagesId
              )
          ),
        }))
      : setCheckboxes((prev) => ({
          ...prev,
          checked: [...prev.checked, toggleItem],
        }));
  };

  const resetCheckboxes = () => {
    setCheckboxes({ checked: [] });
  };

  return (
    <section className="product">
      <div className="productInner">
        <h2 className="sr-only">상품관리</h2>
        <ActionBtnGroup
          checkboxes={checkboxes}
          resetCheckboxes={resetCheckboxes}
          onSearch={onSearch}
        />
        <ProductList
          searchTerm={searchTerm}
          checkboxes={checkboxes}
          checkToggle={checkToggle}
        />
      </div>
    </section>
  );
}

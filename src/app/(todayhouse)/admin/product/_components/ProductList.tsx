import Image from "next/image";
import React, { useState } from "react";
import { useQueryGetData } from "../../_hooks/ReactQuery";
import { CheckState, CheckedItem, Images, Product } from "@/model/product";
import styles from "../_styles/productList.module.scss";
import ModifyProductBtn from "./ModifyProductBtn";
import defaultImage from "/public/noImage.jpeg";
import { ProductLoadingSpinner } from "./ProductLoadingSpinner";

type Prop = {
  searchTerm: string;
  checkboxes: CheckState;
  checkToggle: (checkedItem: CheckedItem) => void;
};

export const ProductList = ({ searchTerm, checkboxes, checkToggle }: Prop) => {
  const productQuery = {
    queryKey: searchTerm
      ? ["admin", "products", searchTerm]
      : ["admin", "products"],
    requestUrl: searchTerm
      ? `/api/admin/product?search=${encodeURIComponent(searchTerm)}`
      : "/api/admin/product",
    gcTime: 6 * 10000,
    staleTime: 12 * 10000,
  };

  const imagesQuery = {
    queryKey: ["admin", "products", "images"],
    requestUrl: "/api/admin/product/images",
    gcTime: 6 * 10000,
    staleTime: 12 * 10000,
  };

  const { data, isLoading } = useQueryGetData(productQuery);
  const { data: images, isLoading: isImageLoading } =
    useQueryGetData(imagesQuery);

  const getProductImages = (product: Product) => {
    const productImages =
      images &&
      images.find(
        (image: Images) => image.imagesId === product.productImagesId
      );

    const mainImage =
      productImages?.mainImage !== ""
        ? productImages?.mainImage
        : productImages?.images[0];

    return mainImage;
  };

  const returnWithComma = (value: string) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <ul className={styles.ul}>
          {isLoading ? (
            <ProductLoadingSpinner></ProductLoadingSpinner>
          ) : data && data?.length !== 0 ? (
            data.map((product: Product) => {
              const imageUrl = getProductImages(product);
              return (
                <li key={product.productId} className={styles.li}>
                  <ModifyProductBtn productId={product.productId} />

                  <div className={styles.productWrap}>
                    <input
                      type="checkbox"
                      className={styles.productCheckbox}
                      id={product.productId}
                      checked={checkboxes.checked.some(
                        (item) => item.productId === product.productId
                      )}
                      onChange={() => {
                        checkToggle({
                          productId: product.productId,
                          productImagesId: product.productImagesId,
                        });
                      }}
                    />
                    <label htmlFor={product.productId} className="sr-only">
                      상품체크버튼
                    </label>
                    <div
                      className={styles.productImage}
                      onClick={() => {
                        checkToggle({
                          productId: product.productId,
                          productImagesId: product.productImagesId,
                        });
                      }}
                    >
                      {imageUrl ? (
                        <Image
                          src={`data:image/*;base64,${imageUrl}`}
                          alt={`제품사진 : ${product.productName}`}
                          fill
                          sizes="(max-width: 280px) 20vw"
                        ></Image>
                      ) : (
                        <Image
                          src={defaultImage}
                          alt={`no Image`}
                          priority
                        ></Image>
                      )}
                    </div>
                    <div className={styles.productDescription}>
                      <ul>
                        <li>{product.brandName}</li>
                        <li>{product.productName}</li>
                        <li>{returnWithComma(product.productPrice)}</li>
                        <li>
                          <span>{product.shipping}</span>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.tooltip}>
                      수정 버튼을 클릭하여 상품 내용을 수정할 수 있습니다.
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div>등록된 상품이 없습니다. 상품 등록을 먼저 진행해주세요.</div>
          )}
        </ul>
      </div>
    </div>
  );
};

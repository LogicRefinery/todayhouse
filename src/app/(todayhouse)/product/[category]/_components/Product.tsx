"use client";
import React from "react";
import { useQueryGetData } from "@/app/(todayhouse)/admin/_hooks/ReactQuery";
import { Images, Product } from "@/model/product";
import styles from "../_styles/product.module.scss";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "/public/noImage.jpeg";
import { ProductSpinner } from "./ProductSpinner";

function Page({ categoryId }: { categoryId: string }) {
  const productQuery = {
    queryKey: ["admin", "products", categoryId],
    requestUrl: `/api/admin/product?search=${encodeURIComponent(categoryId)}`,
    gcTime: 6 * 10000,
    staleTime: 12 * 10000,
  };

  const { data, isLoading } = useQueryGetData(productQuery);

  const imagesQuery = {
    queryKey: ["admin", "products", "images"],
    requestUrl: "/api/admin/product/images",
    gcTime: 6 * 10000,
    staleTime: 12 * 10000,
  };

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
    <section className={styles.articleWrap}>
      {isLoading ? (
        <ProductSpinner />
      ) : data.length !== 0 ? (
        <>
          <h2 className="sr-only">{data[0]?.categoryInfo.categoryName}</h2>
          <div className={styles.articleInner}>
            <div className={styles.articleProduct}>
              {data.map((product: Product, index: number) => {
                const imageUrl = getProductImages(product);
                return (
                  <Link
                    key={product.productId}
                    className={styles.articleLink}
                    href={`/product/${categoryId}/${product.productId}`}
                  >
                    <ul className={styles.article}>
                      <li className={styles.articleImage}>
                        {imageUrl ? (
                          <Image
                            src={`data:image/*;base64,${imageUrl}`}
                            alt={`제품사진 : ${product.productName}`}
                            fill
                          ></Image>
                        ) : (
                          <Image src={defaultImage} alt={`no Image`}></Image>
                        )}
                      </li>
                      <li className={styles.articleBrandName}>
                        {product.brandName}
                      </li>
                      <li className={styles.articleProductName}>
                        {product.productName}
                      </li>
                      <li className={styles.articleProductPrice}>
                        {returnWithComma(product.productPrice)}
                      </li>
                    </ul>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>카테고리에 등록된 상품이 없습니다. 상품을 등록해주세요.</>
      )}
    </section>
  );
}

export default Page;

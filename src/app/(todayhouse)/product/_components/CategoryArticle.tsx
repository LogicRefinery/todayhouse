"use client";
import React from "react";
import { useQueryGetData } from "../../admin/_hooks/ReactQuery";
import { Category } from "@/model/category";
import { Images, Product } from "@/model/product";
import styles from "../_styles/categoryArticle.module.scss";
import Image from "next/image";
// import ArticleImage from "./ArticleImage";
import defaultImage from "/public/noImage.jpeg";
import Link from "next/link";
import { ProductSpinner } from "./ProductSpinner";
import { useParams } from "next/navigation";

function CategoryArticle({ category }: { category: Category }) {
  const productQuery = {
    queryKey: ["admin", "products", category.id],
    requestUrl: `/api/admin/product?search=${encodeURIComponent(category.id)}`,
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
      <div className={styles.articleTitle}>
        <h4>{category.name}</h4>
        <Link href={`/product/${category.id}`}>
          <p>더보기</p>
        </Link>
      </div>
      {isLoading ? (
        <div className={styles.spinnerWrap}>
          <ProductSpinner />
          <p>카테고리별 상품을 가져오고 있습니다.</p>
        </div>
      ) : data.length !== 0 ? (
        <div className={styles.articleProduct}>
          {data &&
            data.map((product: Product, index: number) => {
              // 처음 4개의 상품만 출력하도록 slice 사용
              if (index + 1 > 4) {
                return null;
              }
              const imageUrl = getProductImages(product);
              return (
                <Link
                  key={product.productId}
                  className={styles.articleLink}
                  href={`/product/${category.id}/${product.productId}`}
                >
                  <ul className={styles.article}>
                    <li className={styles.articleImage}>
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
      ) : (
        <>카테고리에 등록된 상품이 없습니다. 상품을 등록해주세요.</>
      )}
    </section>
  );
}

export default CategoryArticle;

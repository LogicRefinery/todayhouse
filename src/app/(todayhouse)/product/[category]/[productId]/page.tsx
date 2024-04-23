"use client";

import React, { useEffect, useState } from "react";
import styles from "./_styles/detail.module.scss";
import { useParams } from "next/navigation";
import { useQueryGetData } from "@/app/(todayhouse)/admin/_hooks/ReactQuery";
import Image from "next/image";
import defaultImage from "/public/noImage.jpeg";

function Page() {
  const { category: categoryId, productId } = useParams();
  const [detailImage, setDetailImage] = useState<string>("");

  // 최초 렌더링시 가장 첫번째 이미지가 디테일 이미지에 렌더링 되야됨

  const { data, isLoading } = useQueryGetData({
    queryKey: ["admin", "products", `${productId}`],
    requestUrl: `/api/admin/product?id=${encodeURIComponent(`${productId}`)}`,
    gcTime: 6 * 10000,
    staleTime: 12 * 10000,
  });

  const { data: imageData, isLoading: imageIsLoading } = useQueryGetData({
    queryKey: ["admin", "products", "image", `${data?.productImagesId}`],
    requestUrl: `/api/admin/product/images?id=${encodeURIComponent(
      `${data?.productImagesId}`
    )}`,
    gcTime: 6 * 10000,
    staleTime: 12 * 10000,
    enabled: !!data?.productImagesId,
  });
  useEffect(() => {
    if (imageData && imageData.mainImage) {
      setDetailImage(imageData.mainImage);
    } else if (imageData && imageData.images.length > 0) {
      setDetailImage(imageData.images[0]);
    }
  }, [imageData]);

  const onClick = (imageUrl: string) => {
    setDetailImage(imageUrl);
  };

  return (
    <article className={styles.articleWrap}>
      <div className={styles.articleInner}>
        {isLoading ? (
          "데이터를 불러오는중입니다."
        ) : (
          <>
            <h2 className="sr-only">상품 상세 페이지</h2>
            <div className={styles.article}>
              <div className={styles.articleImages}>
                {imageIsLoading
                  ? "이미지를 로딩하고 있습니다."
                  : imageData && (
                      <div className={styles.imagesWrap}>
                        <div className={styles.images}>
                          {imageData.images.map(
                            (imageUrl: string, index: number) => {
                              return (
                                <div
                                  className={`${styles.imageWrap} ${
                                    detailImage === imageUrl
                                      ? styles.active
                                      : ""
                                  }`}
                                  key={imageUrl}
                                >
                                  <Image
                                    src={`data:image/*;base64,${imageUrl}`}
                                    alt={`제품사진${index + 1}`}
                                    width={100}
                                    height={100}
                                    onClick={() => {
                                      onClick(imageUrl);
                                    }}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                        <div className={styles.imageDetail}>
                          {detailImage.length === 0 ? (
                            <Image
                              src={defaultImage}
                              alt={"No image"}
                              width={400}
                              height={400}
                            ></Image>
                          ) : (
                            <Image
                              src={`data:image/*;base64,${detailImage}`}
                              alt={`제품사진`}
                              width={400}
                              height={400}
                            ></Image>
                          )}
                        </div>
                      </div>
                    )}
              </div>
              <div className={styles.articleDescriptionWrap}>
                <ul className={styles.articleDescription}>
                  <li className={styles.brandName}>{data.brandName}</li>
                  <li className={styles.productName}>{data.productName}</li>
                  <li className={styles.productPrice}>{data.productPrice}</li>
                  <li className={styles.shipping}>배송 : {data.shipping}</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default Page;

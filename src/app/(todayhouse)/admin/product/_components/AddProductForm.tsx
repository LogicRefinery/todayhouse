"use client";
import styles from "../_styles/modal.module.scss";
import { useForm } from "react-hook-form";
import {
  useCreateImages,
  useCreateProduct,
  useQueryGetData,
} from "../../_hooks/ReactQuery";
import { Category } from "@/model/category";
import { CategoryInfo, Product } from "@/model/product";
import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import { v4 as uuid, validate } from "uuid";
import Image from "next/image";
import defaultImage from "/public/noImage.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ImageProcessingSpinner } from "./ImageProcessingSpinner";
import { blobToBase64 } from "@/app/(todayhouse)/_utill/imageProcess";

function AddProductForm() {
  const createProductMutation = useCreateProduct();
  const createImagesMutation = useCreateImages();
  const [encodedImages, setEncodedImages] = useState<string[]>([]);
  const [imageLength, setImageLength] = useState<number>(0); // 이미지 갯수
  const [imageCountClass, setImageCountClass] = useState<string>("");
  const [mainImage, setMainImage] = useState<string>("");
  const [isImageProcessing, setIsImageProcessing] = useState<boolean>();

  useEffect(() => {
    const className =
      imageLength === 1
        ? styles.singleImage
        : imageLength > 1 && imageLength < 5
        ? styles.multipleImageSmall
        : styles.multipleImageLarge;
    setImageCountClass(className);
  }, [imageLength]);

  const onPrevImageDelete = (image: string, index: number) => {
    const deletedImages = encodedImages.filter((v, i) => i !== index);
    setEncodedImages(deletedImages);
    setImageLength((prev) => prev - 1);
    if (mainImage === image) setMainImage("");
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
    watch,
    reset,
  } = useForm<Product>({
    defaultValues: { shipping: "free" },
  });

  const onSubmit = async (data: Product) => {
    if (typeof data.categoryInfo === "string") {
      data.categoryInfo = JSON.parse(data.categoryInfo);
    }

    const imagesId = uuid();
    const productImages = { imagesId, images: encodedImages, mainImage };

    const newProduct: Product = {
      productId: uuid(),
      categoryInfo: {
        categoryName: data.categoryInfo.categoryName,
        categoryId: data.categoryInfo.categoryId,
      },
      productName: data.productName,
      productImagesId: imagesId,
      brandName: data.brandName,
      productPrice: data.productPrice,
      shipping: data.shipping,
      shippingPrice: data.shippingPrice,
    };

    createProductMutation.mutation.mutate(newProduct);
    createImagesMutation.mutation.mutate(productImages);

    setEncodedImages([]);
    setMainImage("");
    reset();
  };

  const handleMainImage = (image: string) => {
    setMainImage(image);
  };

  const imagesOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEncodedImages([]);
    setMainImage("");

    const files: FileList = e.target.files as FileList;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 600,
      useWebWorker: false,
    };

    setImageLength(files.length);

    if (files.length > 16) {
      alert(
        "이미지 업로드는 최대 16장까지 가능합니다. 16장을 초과한 이미지는 처리되지 않습니다."
      );
      for (let i = 0; i < 16; i++) {
        const image: File = files[i] as File;
        setIsImageProcessing(true);

        try {
          const blobImage = await imageCompression(image, options);
          const base64Image = (await blobToBase64(blobImage)) as string;
          setEncodedImages((prev) => {
            return [...prev, base64Image];
          });
        } catch (error) {
          console.log(error);
        }
        setIsImageProcessing(false);
      }
    } else {
      for (let i = 0; i < files.length; i++) {
        setIsImageProcessing(true);

        const image: File = files[i] as File;
        try {
          const blobImage = await imageCompression(image, options);
          const base64Image = (await blobToBase64(blobImage)) as string;
          setEncodedImages((prev) => {
            return [...prev, base64Image];
          });
        } catch (error) {
          console.log(error);
        }
        setIsImageProcessing(false);
      }
    }
  };

  const { data } = useQueryGetData({
    queryKey: ["admin", "category"],
    requestUrl: "/api/admin/category",
    staleTime: 60 * 1000,
    gcTime: 60 * 2000,
  });

  return (
    <>
      <div className={styles.prevImageWrap}>
        {encodedImages.length === 0 ? (
          <Image src={defaultImage} alt="No Image" width={300} height={300} />
        ) : (
          <ul className={styles.prevImageBoxUl}>
            {encodedImages.map((image, index) => {
              const isMainImageJSX =
                image === mainImage || (mainImage === "" && index === 0) ? (
                  <p className={styles.mainText}>대표</p>
                ) : null;

              const isMainImageStyle =
                image === mainImage || (mainImage === "" && index === 0)
                  ? styles.mainImage
                  : "";

              return (
                <li
                  key={image}
                  className={`${styles.prevImageBoxLi} ${imageCountClass} `}
                >
                  {isImageProcessing ? (
                    <>
                      <ImageProcessingSpinner />
                      <p>이미지 변환중..</p>
                    </>
                  ) : (
                    <>
                      {isMainImageJSX}

                      <Image
                        className={`${styles.prevImage} ${isMainImageStyle}`}
                        src={`data:image/*;base64,${image}`}
                        alt={`미리보기 이미지 ${index + 1}`}
                        fill
                        onClick={() => {
                          handleMainImage(image);
                        }}
                      />
                      <button
                        className={styles.prevImageDeleteBtn}
                        onClick={() => {
                          onPrevImageDelete(image, index);
                        }}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>상품추가 폼</legend>
          <div className={styles.formWrap}>
            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <label htmlFor="selectCategory">
                  상품 카테고리 <small> ( 필수 )</small>
                </label>
              </div>
              <div className={styles.formInput}>
                <select
                  className={
                    isSubmitted
                      ? `${
                          errors.categoryInfo
                            ? styles.inputError
                            : styles.validationPassed
                        }`
                      : "undefined"
                  }
                  id="selectCategory"
                  {...register("categoryInfo", {
                    required: "카테고리 선택은 필수입니다.",
                  })}
                  aria-invalid={
                    isSubmitted
                      ? errors.categoryInfo
                        ? "true"
                        : "false"
                      : undefined
                  }
                >
                  <option value={""}>카테고리 선택</option>
                  {data ? (
                    data.map((category: Category) => (
                      <option
                        key={category.id}
                        value={JSON.stringify({
                          categoryName: category.name,
                          categoryId: category.id,
                        })}
                      >
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option>loading...</option>
                  )}
                </select>
                <div>
                  <small>
                    {errors.categoryInfo ? errors.categoryInfo.message : ""}
                  </small>
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <label htmlFor="productName">
                  상품명 <small> ( 필수 )</small>
                </label>
              </div>
              <div className={styles.formInput}>
                <input
                  className={
                    isSubmitted
                      ? `${
                          errors.productName
                            ? styles.inputError
                            : styles.validationPassed
                        }`
                      : "undefined"
                  }
                  type="text"
                  id="productName"
                  {...register("productName", {
                    required: "상품명 입력은 필수입니다.",
                    pattern: {
                      value:
                        /^[가-힣a-zA-Z\s!@#$%^&*()\[\]{};:'",.?/|<>~`+-]*[ㄱ-ㅎㅏ-ㅣ]*$/,
                      message:
                        "문자, 숫자 및 공백을 포함한 특수문자만 입력하세요.",
                    },
                    maxLength: {
                      value: 20,
                      message: "최대 20 글자까지만 입력 가능합니다.",
                    },
                    minLength: {
                      value: 1,
                      message: "최소 1 글자를 입력해야합니다.",
                    },
                  })}
                  aria-invalid={
                    isSubmitted
                      ? errors.productName
                        ? "true"
                        : "false"
                      : undefined
                  }
                  placeholder="1 ~ 20 글자"
                />
                <div className={styles.errorMessage}>
                  <small>
                    {errors.productName ? errors.productName.message : ""}
                  </small>
                </div>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <label htmlFor="productImages">상품 이미지</label>
              </div>
              <div className={styles.formInput}>
                <input
                  {...register("productImagesId")}
                  id="productImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={imagesOnChange}
                  aria-invalid={
                    isSubmitted
                      ? errors.productImagesId
                        ? "true"
                        : "false"
                      : undefined
                  }
                />
                <div className={styles.errorMessage}>
                  <small>
                    {errors.productImagesId
                      ? errors.productImagesId.message
                      : ""}
                  </small>
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <label htmlFor="brandName">
                  브랜드명<small> ( 필수 )</small>
                </label>
              </div>
              <div className={styles.formInput}>
                <input
                  type="text"
                  id="brandName"
                  className={
                    isSubmitted
                      ? `${
                          errors.brandName
                            ? styles.inputError
                            : styles.validationPassed
                        }`
                      : "undefined"
                  }
                  {...register("brandName", {
                    required: "브랜드명 입력은 필수입니다.",
                    pattern: {
                      value:
                        /^[가-힣a-zA-Z\s!@#$%^&*()\[\]{};:'",.?/|<>~`-]*[ㄱ-ㅎㅏ-ㅣ]*$/,
                      message:
                        "문자, 숫자 및 공백을 포함한 특수문자만 입력하세요. ",
                    },
                    maxLength: {
                      value: 10,
                      message: "최대 10 글자까지만 입력 가능합니다.",
                    },
                    minLength: {
                      value: 1,
                      message: "최소 1 글자를 입력해야합니다.",
                    },
                  })}
                  placeholder="1 ~ 10 글자"
                  aria-invalid={
                    isSubmitted
                      ? errors.brandName
                        ? "true"
                        : "false"
                      : undefined
                  }
                />
                <div className={styles.errorMessage}>
                  <small>
                    {errors.brandName ? errors.brandName.message : ""}
                  </small>
                </div>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <label htmlFor="productPrice">
                  상품 가격<small> ( 필수 )</small>
                </label>
              </div>
              <div className={styles.formInput}>
                <input
                  type="number"
                  id="productPrice"
                  className={
                    isSubmitted
                      ? `${
                          errors.productPrice
                            ? styles.inputError
                            : styles.validationPassed
                        }`
                      : "undefined"
                  }
                  {...register("productPrice", {
                    required: "상품가격 입력은 필수입니다.",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "숫자만 입력 가능합니다.",
                    },
                    max: {
                      value: 99999999,
                      message: "최대 입력 값은 99,999,999 입니다.",
                    },
                    min: { value: 1, message: "최소 입력 값은 1 입니다." },
                  })}
                  aria-invalid={
                    isSubmitted
                      ? errors.productPrice
                        ? "true"
                        : "false"
                      : undefined
                  }
                  placeholder="1 ~ 99,999,999"
                />
                <div className={styles.errorMessage}>
                  <small>
                    {errors.productPrice ? errors.productPrice.message : ""}
                  </small>
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formLabel}>
                <label htmlFor="shippingPrice">
                  배송비<small> ( 유료배송시 필수 )</small>
                </label>
              </div>
              <div className={styles.formInput}>
                <input
                  className={
                    isSubmitted
                      ? `${
                          errors.shippingPrice
                            ? styles.inputError
                            : styles.validationPassed
                        }`
                      : "undefined"
                  }
                  type="number"
                  {...register("shippingPrice", {
                    required:
                      watch("shipping") === "paid"
                        ? "배송비 입력은 필수입니다."
                        : false,
                    max: {
                      value: 50000,
                      message: "최대 입력 값은 50,000 입니다.",
                    },
                    min: { value: 1, message: "최소 입력 값은 1 입니다." },
                  })}
                  disabled={watch("shipping") === "paid" ? false : true}
                  id="shippingPrice"
                  aria-invalid={
                    isSubmitted
                      ? errors.shippingPrice
                        ? "true"
                        : "false"
                      : undefined
                  }
                />
                <div className={styles.errorMessage}>
                  <small>
                    {errors.shippingPrice ? errors.shippingPrice.message : ""}
                  </small>
                </div>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.selectShipping}>
                <div className={styles.formInput}>
                  <input
                    type="radio"
                    id="freeShipping"
                    {...register("shipping")}
                    value="free"
                  />
                </div>
                <div className={styles.formLabel}>
                  <label htmlFor="freeShipping">무료배송</label>
                </div>
              </div>
              <div className={styles.selectShipping}>
                <div className={styles.formInput}>
                  <input
                    type="radio"
                    id="paidShipping"
                    {...register("shipping")}
                    value="paid"
                  />
                </div>
                <div className={styles.formLabel}>
                  <label htmlFor="paidShipping">유료배송</label>
                </div>
              </div>
              <div className={styles.errorMessage}>
                <small>{errors.shipping ? errors.shipping.message : ""}</small>
              </div>
            </div>
            <div className={styles.formRow}>
              <input
                type="submit"
                className={
                  isSubmitting || isImageProcessing
                    ? styles.formSubmitDisabled
                    : styles.formSubmit
                }
                disabled={isSubmitting || isImageProcessing}
                value="추가"
              />
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default AddProductForm;

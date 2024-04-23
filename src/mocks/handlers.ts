import {
  CheckState,
  CheckedItem,
  Images,
  Product,
  CategoryInfo,
  ProductList,
} from "@/model/product";
import { Category } from "@/model/category";
import { http, HttpResponse } from "msw";

export const handlers = [
  /*현재 전체 리스트와 검색어가 있을때를 하나의 API 엔드포인트가 도맡아서 하는데 두개로 분리하자. 원칙적으로는 따로 하는것이 맞음*/

  http.get("/api/admin/category", async ({ request }) => {
    const categories = JSON.parse(localStorage.getItem("categoryList") || "[]");

    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search");
    const filteredCategories = searchTerm
      ? categories.filter((category: Category) =>
          category.name.includes(searchTerm)
        )
      : categories;

    // 검색어가 있을 때만 1초의 지연을 추가
    if (searchTerm) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return HttpResponse.json(filteredCategories);
  }),

  http.post("/api/admin/category", async ({ request }) => {
    const categories = JSON.parse(
      localStorage.getItem("categoryList") as string
    );
    const requestData = await request.json();
    const mergedCategoryData = [...categories, requestData];

    localStorage.setItem("categoryList", JSON.stringify(mergedCategoryData));

    return HttpResponse.json(mergedCategoryData);
  }),

  http.delete("/api/admin/category", async ({ request }) => {
    const categories = JSON.parse(
      localStorage.getItem("categoryList") as string
    );
    const requestData = (await request.json()) as string[];
    const filteredCategories = categories.filter(
      (category: Category) => !requestData?.includes(category.id)
    );
    localStorage.setItem("categoryList", JSON.stringify(filteredCategories));

    return HttpResponse.json({
      status: 200,
      message: `카테고리를 삭제하였습니다.`,
    });
  }),

  http.get("/api/admin/product", async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search");
    const id = url.searchParams.get("id");

    const products = JSON.parse(localStorage.getItem("products") || "[]");
    let filteredProducts;

    if (searchTerm) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      filteredProducts = products.filter((product: Product) => {
        return product.categoryInfo.categoryId === searchTerm;
      });
    }

    if (id) {
      filteredProducts = products.find((product: Product) => {
        return product.productId === id;
      });
    }

    if (!searchTerm && !id) {
      filteredProducts = products;
    }

    if (products === null) {
      localStorage.setItem("products", "[]");
    }

    return HttpResponse.json(filteredProducts);
  }),

  http.post("/api/admin/product", async ({ request }) => {
    const req = await request.json();
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const addedProducts = products.concat(req);

    localStorage.setItem("products", JSON.stringify(addedProducts));

    return HttpResponse.json(addedProducts);
  }),

  http.delete("/api/admin/product", async ({ request }) => {
    const req = (await request.json()) as { checked: CheckedItem[] };
    const products = JSON.parse(localStorage.getItem("products") as string);

    const filteredProducts = products.filter(
      (product: Product) =>
        !req.checked.some(
          (item: CheckedItem) => item.productId === product.productId
        )
    );
    localStorage.setItem("products", JSON.stringify(filteredProducts));

    return HttpResponse.json({ status: "200", response: filteredProducts });
  }),

  http.patch("/api/admin/product", async ({ request }) => {
    const req = (await request.json()) as Product;
    const products = JSON.parse(localStorage.getItem("products") as string);
    const patchProducts = products.map((product: Product) => {
      return product.productId === req.productId ? req : product;
    });
    localStorage.setItem("products", JSON.stringify(patchProducts));
    return HttpResponse.json(patchProducts);
  }),
  http.get("/api/admin/product/images", ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    console.log("아이디", id);
    const images = JSON.parse(localStorage.getItem("images") || "[]");
    let filteredImages;

    if (images === null) {
      localStorage.setItem("images", "[]");
    }

    id
      ? (filteredImages = images.find((image: Images) => image.imagesId === id))
      : (filteredImages = images);

    return HttpResponse.json(filteredImages);
  }),

  http.post("/api/admin/product/images", async ({ request }) => {
    const req = await request.json();
    const storageImages = JSON.parse(localStorage.getItem("images") || "[]");

    if (storageImages === null) {
      localStorage.setItem("images", "[]");
    }

    const addedImages = [...storageImages, req];
    localStorage.setItem("images", JSON.stringify(addedImages));

    return HttpResponse.json(addedImages);
  }),

  http.delete("/api/admin/product/images", async ({ request }) => {
    const req = (await request.json()) as { checked: CheckedItem[] };
    const storageImages = JSON.parse(localStorage.getItem("images") || "[]");

    const filteredImages = storageImages.filter(
      (images: Images) =>
        !req.checked.some((item) => item.productImagesId === images.imagesId)
    );

    localStorage.setItem("images", JSON.stringify(filteredImages));

    return HttpResponse.json(filteredImages);
  }),
  http.patch("/api/admin/product/images", async ({ request }) => {
    const req = (await request.json()) as Images;
    const images = JSON.parse(localStorage.getItem("images") as string);
    const patchImages = images.map((image: Images) => {
      return image.imagesId === req.imagesId ? req : image;
    });
    localStorage.setItem("images", JSON.stringify(patchImages));

    return HttpResponse.json(patchImages);
  }),
  http.get("/api/product/trendingKeywords", () => {
    const storageTrendingKeywords = JSON.parse(
      localStorage.getItem("trendingKeywords") || "[]"
    );
    const keyword = [
      "사무실",
      "주방 정리",
      "팬트리선반",
      "등쿠션",
      "디퓨져",
      "이동식 행거",
      "스타우브",
      "작은방 꾸미기",
      "미드센츄",
    ];

    if (storageTrendingKeywords.length === 0) {
      localStorage.setItem("trendingKeywords", JSON.stringify(keyword));
    }

    return HttpResponse.json(storageTrendingKeywords);
  }),
];

import { Category } from "@/model/category";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/admin/category", async ({ request }) => {
    const categories = JSON.parse(localStorage.getItem("categoryList") || "{}");
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search");
    const filteredCategories = searchTerm
      ? categories.filter((category: Category) =>
          category.name.includes(searchTerm)
        )
      : categories;

    return HttpResponse.json(filteredCategories);
  }),

  http.post("/api/admin/category", async ({ request }) => {
    const categories = JSON.parse(
      localStorage.getItem("categoryList") as string
    );
    const requestData = await request.json();
    const mergedCategoryData = [...categories, requestData];

    localStorage.setItem("categoryList", JSON.stringify(mergedCategoryData));

    return HttpResponse.json({
      status: 200,
      message: `새 카테고리를 추가 하였습니다.`,
    });
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
];

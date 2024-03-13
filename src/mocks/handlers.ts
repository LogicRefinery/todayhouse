import { Category } from "@/model/category";
import { http, HttpResponse } from "msw";

let localStorageData: any = [];

export const handlers = [
  http.post("http://localhost:9090", async ({ request }) => {
    const req = await request.json();

    localStorageData = req;

    return HttpResponse.json({
      status: 200,
      message: "로컬스토리지 데이터 셋팅이 완료되었습니다.",
    });
  }),

  http.get("http://localhost:9090/admin/category", () => {
    return HttpResponse.json(localStorageData);
  }),
  http.post("http://localhost:9090/admin/category", async ({ request }) => {
    const req = await request.json();
    localStorageData && localStorageData.push(req);

    return HttpResponse.json(req);
  }),
  http.delete("http://localhost:9090/admin/category", async ({ request }) => {
    const req = (await request.json()) as string[];

    localStorageData = localStorageData.filter(
      (category: Category) => !req.includes(category.id)
    );

    //삭제요청 (어떤거 삭제할지) -> 로컬스토리지 데이터 저장한거에서 삭제 -> 리턴
    //리턴 받은거 리액트쿼리에 적용 -> 로컬스토리지 적용..
    return HttpResponse.json(localStorageData);
  }),
];

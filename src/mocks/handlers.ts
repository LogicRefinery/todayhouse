import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:9090/data", () => {
    return HttpResponse.json({ status: 200 });
  }),
  //   http.get("/resource", () => {
  //     return HttpResponse.json({
  //       id: "abc-123",
  //       title: "Modern Testing Practices",
  //     });
  //   }),
];

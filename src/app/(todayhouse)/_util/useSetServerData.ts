import { handlers } from "@/mocks/handlers";
import { useEffect, useState } from "react";

// next dynamic import 알아보기.
// next app 실행 -> 특정페이지 접속 -> useEffect 되는 시점 즈음 import 를 뒤늦게 할 수 있음.
// 단점. 다른 사람들이 헷갈릴 수 있음. 가독성 떨어진다는 뜻.

//클라이언트 -> 서버 -> 데이터베스 -> 서버 -> 클라이언트

//클라이언트 -> 클라이언트 데이터를 -> 서버 -> 클라인언트 -> 서버 -> 클라이언트
export default function useSetServerData() {
  useEffect(() => {
    const storage = localStorage.getItem("categoryList") || "[]";
    let setServerData: () => Promise<any> | undefined = async () => {
      const res = await fetch("/api/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: storage,
      });
      return await res.json();
    };
    if (typeof window !== "undefined") {
      //1.5초 설정의 이유 : require 로 불러오는 시간을 확보하기 위해..
      const browser = require("msw/browser"); //require 은 비동기식 임포트다 .
      setTimeout(() => {
        browser
          .setupWorker(...handlers)
          .start()
          .then(() => {
            setServerData();
          });
      }, 1500);
    }
  }, []);
}

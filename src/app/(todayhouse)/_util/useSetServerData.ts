"use client";

import { useEffect } from "react";

// next dynamic import 알아보기.
// next app 실행 -> 특정페이지 접속 -> useEffect 되는 시점 즈음 import 를 뒤늦게 할 수 있음.
// 단점. 다른 사람들이 헷갈릴 수 있음. 가독성 떨어진다는 뜻.

//클라이언트 -> 서버 -> 데이터베스 -> 서버 -> 클라이언트

//클라이언트 -> 클라이언트 데이터를 -> 서버 -> 클라인언트 -> 서버 -> 클라이언트
export default function useSetServerData() {
  useEffect(() => {
    if (localStorage.getItem("categoryList") === null) {
      localStorage.setItem("categoryList", "[]");
    }
    const storage = localStorage.getItem("categoryList");

    let setServerData: () => Promise<any> | undefined = async () => {
      const res = await fetch("http://localhost:9090", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: storage,
      });
      return await res.json();
    };

    setServerData();
  }, []);
}

"use client";

import { handlers } from "@/mocks/handlers";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MswLoadingSpinner } from "@/_components/MswLoadingSpinner";

export default function LocalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //1.5초 설정의 이유 : require 로 불러오는 시간을 확보하기 위해..
      const browser = require("msw/browser"); //require 은 비동기식 임포트다 .
      setTimeout(() => {
        browser.setupWorker(...handlers).start({
          //요청 핸들러가 없다는 경고를 무시하는 옵션. 왜 발생하는지 이유는 잘 모르겠다.
          onUnhandledRequest: "bypass",
        });
        setIsLoading(false);
      }, 1500);
    }

    if (localStorage.getItem("categoryList") === null || "[]") {
      console.log("돌아가냐 ?");

      localStorage.setItem(
        "categoryList",
        '[{"id":"1","name":"기본 카테고리"}]'
      );
    }

    if (localStorage.getItem("trendingKeywords") === null) {
      localStorage.setItem(
        "trendingKeywords",
        '["사무실","주방정리","팬트리 선반","등쿠션","디퓨저","이동식 행거","스타우브","작은방 꾸미기","미드센츄"]'
      );
    }
  }, []);

  return <>{isLoading ? <MswLoadingSpinner /> : children}</>;
}

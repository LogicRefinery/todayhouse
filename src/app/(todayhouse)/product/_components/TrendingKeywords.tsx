"use client";
import Link from "next/link";
import React from "react";
import styles from "../_styles/nav.module.scss";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TrendingKeywords() {
  const { data, isLoading } = useQuery({
    queryKey: ["product", "trendingKeywords"],
    queryFn: async () => {
      const res = await fetch("/api/product/trendingKeywords");
      const data = await res.json();
      return data;
    },
  });

  const settings = {
    slide: "li", //슬라이드 되어야 할 태그 ex) div, li
    infinite: true, //무한 반복 옵션
    slidesToShow: 1, // 한 화면에 보여질 컨텐츠 개수
    slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
    // speed: 100, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
    // arrows: true, // 옆으로 이동하는 화살표 표시 여부
    // dots: true, // 스크롤바 아래 점으로 페이지네이션 여부
    autoplay: true, // 자동 스크롤 사용 여부
    autoplaySpeed: 2000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    pauseOnHover: true, // 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
    vertical: true, // 세로 방향 슬라이드 옵션
    // prevArrow: "<button type='button' class='slick-prev'>Previous</button>", // 이전 화살표 모양 설정
    // nextArrow: "<button type='button' class='slick-next'>Next</button>", // 다음 화살표 모양 설정
    // dotsClass: "slick-dots", //아래 나오는 페이지네이션(점) css class 지정
    // draggable: true, //드래그 가능 여부

    // responsive: [
    //   // 반응형 웹 구현 옵션
    //   {
    //     breakpoint: 960, //화면 사이즈 960px일 때
    //     settings: {
    //       //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
    //       slidesToShow: 3,
    //     },
    //   },
    //   {
    //     breakpoint: 768, //화면 사이즈 768px일 때
    //     settings: {
    //       //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
    //       slidesToShow: 2,
    //     },
    //   },
    // ],
  };

  return (
    <ul className={styles.trendingKeywordsUl}>
      {isLoading ? (
        <>..키워드 로딩중</>
      ) : (
        <Slider {...settings}>
          {data &&
            data.map((keyword: string, index: number) => {
              return (
                <li key={keyword}>
                  <Link href={`/product?search=${keyword}`}>
                    <p className={styles.rank}>{index + 1}</p>
                    <p className={styles.keyword}>{keyword}</p>
                  </Link>
                </li>
              );
            })}
        </Slider>
      )}
    </ul>
  );
}

export default TrendingKeywords;

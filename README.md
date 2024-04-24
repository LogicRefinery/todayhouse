<img src="https://capsule-render.vercel.app/api?type=waving&color=64d8fe&height=150&section=header" />

THMall

![image](https://github.com/LogicRefinery/todayhouse/assets/96185872/a03a8610-d0db-4d1d-9c17-e971929875da) [![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=LogicRefinery)](https://github.com/anuraghazra/github-readme-stats)

<img src="https://img.shields.io/badge/Javascript-000?style=flat-square&logo=javascript&logoColor=#F7DF1E"/> <img src="https://img.shields.io/badge/Typescript-000?style=flat-square&logo=typescript&logoColor=#3178C6"/> <img src="https://img.shields.io/badge/ReactJs-000?style=flat-square&logo=react&logoColor=#61DAFB"/> <img src="https://img.shields.io/badge/NextJs-000?style=flat-square&logo=nextdotjs&logoColor=#000000"/> <img src="https://img.shields.io/badge/ReactQuery-000?style=flat-square&logo=reactquery&logoColor=#FF4154"/> <img src="https://img.shields.io/badge/ReactHookForm-000?style=flat-square&logo=reacthookform&logoColor=#EC5990"/> <img src="https://img.shields.io/badge/Sass Module-000?style=flat-square&logo=Sass&logoColor=#CC6699"/> <img src="https://img.shields.io/badge/Msw-000?style=flat-square&logo=msw&logoColor=#E5122E"/>


프론트엔드 서비스 아키텍처
![image](https://github.com/LogicRefinery/todayhouse/assets/96185872/1f2c6492-8932-4997-a586-1ce34730dbc5)

메인
MSW 로딩
![msw 로딩](https://github.com/LogicRefinery/todayhouse/assets/96185872/4d6e5a75-a349-4c83-b9d7-5c2cb95fe957)
주요 기능 
1.MSW가 안정적으로 서비스워커를 실행하는 시점까지 대기합니다.

라우팅
1.어드민 사이드
2.유저 사이드

어드민 사이드

카테고리 추가
![카테고리 추가](https://github.com/LogicRefinery/todayhouse/assets/96185872/f1b2cfb4-58a2-4798-a934-d8cc3fb401ce)
주요 기능
1. 카테고리를 추가합니다.

카테고리 삭제
![카테고리 삭제](https://github.com/LogicRefinery/todayhouse/assets/96185872/47bec07a-b3fe-45d8-bbf7-966036f36bdb)
주요 기능
1. 카테고리를 삭제합니다.
2. 상품이 등록되어있는 카테고리는 삭제가 불가능합니다.

카테고리 검색
![카테고리 검색](https://github.com/LogicRefinery/todayhouse/assets/96185872/253b5a57-bd30-45b9-9ea2-4c93fd1f57b9)
주요 기능
1. 카테고리를 검색합니다.
2. 디바운싱이 적용되어 사용자의 입력 직후 0.5초 API요청 딜레이가 있습니다.

상품 추가
![상품 추가](https://github.com/LogicRefinery/todayhouse/assets/96185872/efddab80-3ad1-4ce8-8bba-0ed8fb8a829a)
주요 기능
1. 상품을 추가합니다.
2. 리액트 훅 폼을 사용하였습니다.
3. 벨리데이트 : 최초 서브밋 전까지는 검증하지 않습니다. 최초 서브밋 이후에 실시간으로 검증합니다.
4. 대표이미지 설정이 가능합니다.
5. 이미지 프로세싱 : 이미지를 압축하고, 로컬스토리지에 저장하기위해 base4 형식으로 인코딩합니다.


상품 수정
![상품 수정](https://github.com/LogicRefinery/todayhouse/assets/96185872/e02aa1c5-046a-40f2-b1b0-df5428657726)
주요 기능
1. 상품을 수정합니다.
2. 새로 추가되는 이미지만 이미지 프로세싱이 진행됩니다.

상품 삭제
![상품 삭제](https://github.com/LogicRefinery/todayhouse/assets/96185872/2f138581-d964-444e-8c31-b41ba422d22f)
주요 기능
1. 상품을 삭제합니다.
2. 상품과 연동되어있는 이미지도 삭제됩니다.

상품 필터링
![상품 필터링](https://github.com/LogicRefinery/todayhouse/assets/96185872/b778a912-34a8-412b-b1f5-26a3805d4dcf)
주요 기능
1. 지정한 카테고리로 상품을 필터링합니다.


유저사이드

메인
![유저사이드 메인](https://github.com/LogicRefinery/todayhouse/assets/96185872/7d74ec86-ab62-473a-8622-f63b4786f8ff)
주요 기능
1. 등록된 카테고리별로 4개의 상품을 볼 수 있습니다.
2. 등록된 최신 순서로 보여십니다.

라우팅
1. 메뉴 or 더보기 클릭시 카테고리별 메뉴로 서브페이지로 이동
2. 상품 클릭시 상품 상세페이지로 이동

카테고리별 서브
![유저사이드 서브](https://github.com/LogicRefinery/todayhouse/assets/96185872/8b84f89d-1b01-4f87-a23b-9468ae8c2de0)
주요 기능
1. 카테고리별 상품들을 볼 수 있습니다.

상품 상세페이지
![유저사이드 상세](https://github.com/LogicRefinery/todayhouse/assets/96185872/4e74dd5f-4de2-41b9-85d9-695266d3d722)
주요 기능
1. 각 상품의 상세정보를 볼 수 있습니다.
2. 좌측 작은 이미지 클릭시 디테일 이미지가 변경됩니다.





<img src="https://capsule-render.vercel.app/api?type=waving&color=64d8fe&height=150&section=footer" />

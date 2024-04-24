<img src="https://capsule-render.vercel.app/api?type=waving&color=64d8fe&height=150&section=header" />

# THMall ( 이커머스 웹앱 )

## 프로젝트 소개
이커머스 웹앱은 현대 사회에서 가장 흔히 접할 수 있는 온라인 플랫폼 중 하나이며, 기업의 비즈니스 모델과 실익에 직접적인 영향을 미칩니다. 따라서 실무에서 직면할 수 있는 수 많은 기술적 문제를 마주할 수 있다는 장점이 있다고 생각했기에 선택했습니다. 실제로, 프로젝트 진행 중 다양한 기능의 추가와 사용자 경험을 고려하였습니다.

개발 기간 및 링크|기술 스택|
|:---|:---:|
|기간 : 2024.02 - 2024.03<br>URL : <https://todayhouse.vercel.app/><br>PDF : <https://drive.google.com/file/d/1fYB9I2kTvFjDbjI-z9ifyNEjZxpgvNvh/view?usp=sharing>|<img src="https://img.shields.io/badge/Javascript-000?style=flat-square&logo=javascript&logoColor=#F7DF1E"/> <img src="https://img.shields.io/badge/Typescript-000?style=flat-square&logo=typescript&logoColor=#3178C6"/> <img src="https://img.shields.io/badge/ReactJs-000?style=flat-square&logo=react&logoColor=#61DAFB"/> <img src="https://img.shields.io/badge/NextJs-000?style=flat-square&logo=nextdotjs&logoColor=#000000"/> <img src="https://img.shields.io/badge/ReactQuery-000?style=flat-square&logo=reactquery&logoColor=#FF4154"/> <img src="https://img.shields.io/badge/ReactHookForm-000?style=flat-square&logo=reacthookform&logoColor=#EC5990"/> <img src="https://img.shields.io/badge/Sass Module-000?style=flat-square&logo=Sass&logoColor=#CC6699"/> <img src="https://img.shields.io/badge/Msw-000?style=flat-square&logo=msw&logoColor=#E5122E"/>|

## 프론트엔드 서비스 아키텍처
![image](https://github.com/LogicRefinery/todayhouse/assets/96185872/1f2c6492-8932-4997-a586-1ce34730dbc5)

---

## 메인
### MSW 로딩<br>

![msw 로딩](https://github.com/LogicRefinery/todayhouse/assets/96185872/4d6e5a75-a349-4c83-b9d7-5c2cb95fe957)<br>

#### 주요 기능
1. MSW가 안정적으로 서비스워커를 실행하는 시점까지 대기합니다.
   
#### 라우팅
1. 어드민 사이드
2. 유저 사이드

---

## 어드민 사이드

### 카테고리 추가

<br>![카테고리 추가](https://github.com/LogicRefinery/todayhouse/assets/96185872/f1b2cfb4-58a2-4798-a934-d8cc3fb401ce)<br>

#### 주요 기능
1. 카테고리를 추가합니다.
2. 이름이 같은 카테고리는 추가할 수 없습니다.

### 카테고리 삭제

<br>![카테고리 삭제](https://github.com/LogicRefinery/todayhouse/assets/96185872/47bec07a-b3fe-45d8-bbf7-966036f36bdb)

#### 주요 기능
1. 카테고리를 삭제합니다.
2. 상품이 등록되어있는 카테고리는 삭제가 불가능합니다.

### 카테고리 검색

<br>![카테고리 검색](https://github.com/LogicRefinery/todayhouse/assets/96185872/253b5a57-bd30-45b9-9ea2-4c93fd1f57b9)<br>

#### 주요 기능
1. 카테고리를 검색합니다.
2. 디바운싱이 적용되어 사용자의 입력 직후 0.5초 API요청 딜레이가 있습니다.

### 상품 추가

<br>![상품 추가](https://github.com/LogicRefinery/todayhouse/assets/96185872/efddab80-3ad1-4ce8-8bba-0ed8fb8a829a)<br>

### 주요 기능
1. 상품을 추가합니다.
2. 리액트 훅 폼을 사용하였습니다.
3. 벨리데이트 : 최초 서브밋 전까지는 검증하지 않습니다. 최초 서브밋 이후에 실시간으로 검증합니다.
4. 대표이미지 설정이 가능합니다.
5. 이미지 프로세싱 : 이미지를 압축하고, 로컬스토리지에 저장하기위해 base4 형식으로 인코딩합니다.

### 상품 수정

<br>![상품 수정](https://github.com/LogicRefinery/todayhouse/assets/96185872/e02aa1c5-046a-40f2-b1b0-df5428657726)<br>

#### 주요 기능
1. 상품을 수정합니다.
2. 새로 추가되는 이미지만 이미지 프로세싱이 진행됩니다.

### 상품 삭제

<br>![상품 삭제](https://github.com/LogicRefinery/todayhouse/assets/96185872/2f138581-d964-444e-8c31-b41ba422d22f)<br>

#### 주요 기능
1. 상품을 삭제합니다.
2. 상품과 연동되어있는 이미지도 삭제됩니다.

### 상품 필터링

<br>![상품 필터링](https://github.com/LogicRefinery/todayhouse/assets/96185872/b778a912-34a8-412b-b1f5-26a3805d4dcf)<br>

#### 주요 기능
1. 지정한 카테고리로 상품을 필터링합니다.


## 유저사이드

### 메인

<br>![유저사이드 메인](https://github.com/LogicRefinery/todayhouse/assets/96185872/7d74ec86-ab62-473a-8622-f63b4786f8ff)<br>

#### 주요 기능
1. 등록된 카테고리별로 4개의 상품을 볼 수 있습니다.
2. 등록된 최신 순서로 보여십니다.

#### 라우팅
1. 메뉴 or 더보기 클릭시 카테고리별 메뉴로 서브페이지로 이동
2. 상품 클릭시 상품 상세페이지로 이동

### 카테고리별 서브

<br>![유저사이드 서브](https://github.com/LogicRefinery/todayhouse/assets/96185872/8b84f89d-1b01-4f87-a23b-9468ae8c2de0)<br>

#### 주요 기능
1. 카테고리별 상품들을 볼 수 있습니다.

### 상품 상세페이지

<br>![유저사이드 상세](https://github.com/LogicRefinery/todayhouse/assets/96185872/4e74dd5f-4de2-41b9-85d9-695266d3d722)<br>

#### 주요 기능
1. 각 상품의 상세정보를 볼 수 있습니다.
2. 좌측 작은 이미지 클릭시 디테일 이미지가 변경됩니다.





<img src="https://capsule-render.vercel.app/api?type=waving&color=64d8fe&height=150&section=footer" />

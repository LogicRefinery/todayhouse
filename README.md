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
<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/fe6abe92-d89e-4c91-8a1d-c38c8426f896" width="100%"/>

#### 주요 기능
1. MSW가 안정적으로 서비스워커를 실행하는 시점까지 대기합니다.
   
#### 라우팅
1. 어드민 사이드
2. 유저 사이드
<br>

---

## 어드민 사이드

### 카테고리 추가
<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/6c56d0b7-9d83-4a19-8d21-ebaba9c2dc17" width="100%"/>

#### 주요 기능
1. 카테고리를 추가합니다.
2. 이름이 같은 카테고리는 추가할 수 없습니다.
<br>

### 카테고리 삭제

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/b6d6f43d-cc04-4982-8cd2-631f2a0bfcb5" width="100%"/>

#### 주요 기능
1. 카테고리를 삭제합니다.
2. 상품이 등록되어있는 카테고리는 삭제가 불가능합니다.
<br>

### 카테고리 검색

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/56d8a45c-aa87-431c-b2c5-35259728abd4" width="100%"/>

#### 주요 기능
1. 카테고리를 검색합니다.
2. 디바운싱이 적용되어 사용자의 입력 직후 0.5초 API요청 딜레이가 있습니다.
<br>

### 상품 추가

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/ffff0f9d-5d9a-4fb2-aa26-acee4f0d084d" width="100%"/>

### 주요 기능
1. 상품을 추가합니다.
2. 리액트 훅 폼을 사용하였습니다.
3. 벨리데이트 : 최초 서브밋 전까지는 검증하지 않습니다. 최초 서브밋 이후에 실시간으로 검증합니다.
4. 대표이미지 설정이 가능합니다.
5. 이미지 프로세싱 : 이미지를 압축하고, 로컬스토리지에 저장하기위해 base4 형식으로 인코딩합니다.
<br>

### 상품 수정

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/64412e6d-fcfe-4551-a8e4-0d0f4c0a4273" width="100%"/>

#### 주요 기능
1. 상품을 수정합니다.
2. 새로 추가되는 이미지만 이미지 프로세싱이 진행됩니다.
<br>

### 상품 삭제

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/1133c9f8-4d21-4220-a5a7-1b34ad92f697" width="100%"/>

#### 주요 기능
1. 상품을 삭제합니다.
2. 상품과 연동되어있는 이미지도 삭제됩니다.
<br>

### 상품 필터링

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/740cc808-c363-4900-8c8d-e912e5411068" width="100%"/>

#### 주요 기능
1. 지정한 카테고리로 상품을 필터링합니다.
<br>

## 유저사이드

### 메인

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/c4972858-512f-42a3-b5dc-b29bc6c4ce00" width="100%"/>

#### 주요 기능
1. 등록된 카테고리별로 4개의 상품을 볼 수 있습니다.
2. 등록된 최신 순서로 보여십니다.

#### 라우팅
1. 메뉴 or 더보기 클릭시 카테고리별 메뉴로 서브페이지로 이동
2. 상품 클릭시 상품 상세페이지로 이동
<br>

### 카테고리별 서브

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/18253172-e01e-416f-9e1b-8f6aaddd8c5a" width="100%"/>

#### 주요 기능
1. 카테고리별 상품들을 볼 수 있습니다.
<br>

### 상품 상세페이지

<img src="https://github.com/LogicRefinery/todayhouse/assets/96185872/eb86b9af-749e-4c95-a7f8-1283ec61dcf5" width="100%"/>

#### 주요 기능
1. 각 상품의 상세정보를 볼 수 있습니다.
2. 좌측 작은 이미지 클릭시 디테일 이미지가 변경됩니다.

<img src="https://capsule-render.vercel.app/api?type=waving&color=64d8fe&height=150&section=footer" />

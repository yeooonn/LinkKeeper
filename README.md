# LinkKeeper

## 📌 프로젝트 개요

**LinkKeeper**는 "나중에 읽기"로 저장한 콘텐츠(링크)를 관리하여, 사용자가 실제로 읽을 수 있도록 돕는 **링크 관리 서비스**입니다. 

---

🚧 프로젝트 진행 현황
- 현재 **진행 중(Work in Progress)** 인 프로젝트입니다.  
- `main` 브랜치에 머지될 경우 **자동으로 배포**됩니다.  

- 🌐 배포 링크: 🔗 [https://link-keeper-mocha.vercel.app/](https://link-keeper-mocha.vercel.app/)

---

## 🛠️ 사용 기술

- **Next.js**(App Router 기반 SSR/CSR 혼합, API 라우트 사용)
- **React 19**
- **Prisma ORM**, **Supabase Auth** (DB 및 인증)
- **TailwindCSS** (유틸 기반 스타일)
- **React Query, Zustand**
- **React Hook Form, Zod**
- **ESLint, TypeScript** (정적 타입, 품질/검사)

## 🗂️ src 폴더 구조와 역할
### 📂 폴더 구조

```
src/
├── app/              # 라우트, Layout, Providers
├── entites/          # 폴더·링크 등 도메인 모델별 계층
├── features/         # 기능 단위(로그인/추가/삭제/검색 등)
├── widgets/          # Header, Sidebar 등 UI 조각
└── shared/           # 공통 hooks·컴포넌트·유틸·상수
```

- **/app:**

  - Next.js 13+의 App Router 방식 사용
  - 페이지와 라우트(`route.ts`), 레이아웃(`layout.tsx`), 글로벌 스타일 및 Provider 컴포넌트 등 배치
  - API 라우트(서버 핸들러), 인증, 메인 페이지, 폴더/링크 상세 등 서버-클라이언트 통합 구조

- **/entites:**

  - 도메인 별 엔티티(폴더, 링크, 유저, 메뉴 등) 관리
  - 각 엔티티별로 api, model(비즈니스로직, 타입, 커스텀훅), ui(컴포넌트)로 세분화
  - 예: `/entites/folder/`, `/entites/link/`, ...
  - SRP(단일책임 원칙) 기반, 재사용성 및 유지보수 고려

- **/features:**

  - 독립적인 기능 단위의 폴더 구조
  - 예: 링크 추가, 삭제, 수정, 읽음처리, 북마크 토글, 로그인 등
  - 각 폴더마다 api·model·ui 형식 분리
  - 복수의 페이지 혹은 다른 엔티티(폴더/링크 등)에서 import해 사용

- **/widgets:**

  - 상위 레이아웃, 섹션, 주요 UI 조각(GuestHome, Header, Sidebar 등)
  - 여러 엔티티와 상태를 조합한 박스형 UI 또는 Layout 컴포넌트

- **/shared:**
  - 공통 자원/유틸(유틸함수, 상수, hooks), 재사용 컴포넌트(Atoms/Molecules),  
    assets(이미지, 아이콘), 스타일, 스토어, 라이브러리 초기화 등

## 🏗️ 구조적 특징

- **폴더 설계:**  
  엔티티(Entity)-기반 + 기능(Feature)별 분리.  
  → 각 도메인(폴더/링크/유저)의 독립성과 기능별 관심사 분리.

- **코드 분리:**  
  api(백엔드 호출), model(로직/타입/상태), ui(컴포넌트)로 세분화.
- **공통 자원 이원화:**  
  shared(진짜 공용) & features/entities(도메인/기능별 관점)로 명확한 분리.

## ✨ 주요 플로우

- **인증:** Supabase 기반 세션을 미들웨어(서버, `/src/middleware.ts`)에서 자동 갱신 및 검증.
- **링크 읽음 기록:** API 라우트(`/api/links/[linkId]/read/route.tsx`)에서 Prisma upsert로 추적 및 중복 방지.
- **React Query 기반의 실시간 데이터 관리. Zustand 등으로 클라이언트 글로벌 상태/모달 등 제어.**
- **유저별 맞춤 랜딩, 폴더/링크 트리 UI, 북마크, 태그 등 다양한 링크 관리 기능.**

---

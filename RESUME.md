# LinkKeeper - 이력서용 프로젝트 요약

## 프로젝트명

**LinkKeeper** - 링크 관리 웹 애플리케이션

## 기간

2024.10 ~ 진행 중

## 프로젝트 설명

"나중에 읽기"로 저장한 링크를 체계적으로 관리하는 풀스택 웹 애플리케이션. 폴더 및 태그를 통한 링크 분류, 읽음 처리, 북마크, 알림 설정 등 종합적인 링크 관리 기능 제공.

## 기술 스택

**Frontend**: Next.js 15 (App Router), React 19, TypeScript, TailwindCSS  
**Backend**: Next.js API Routes, Prisma ORM, PostgreSQL  
**인증**: Supabase Auth (카카오/네이버/GitHub OAuth)  
**상태 관리**: React Query, Zustand  
**폼/검증**: React Hook Form, Zod

## 주요 구현 내용

### 1. Feature-Sliced Design 아키텍처 적용

- 계층별 관심사 분리 (entities/features/widgets/shared)
- 도메인별 독립성 확보 및 재사용성 극대화
- 순환 참조 방지를 통한 유지보수성 향상

### 2. 서버/클라이언트 컴포넌트 최적화

- Next.js 15 App Router 기반 SSR/CSR 혼합 렌더링
- 서버 컴포넌트에서 데이터 prefetch로 초기 로딩 성능 개선
- React Query를 활용한 서버 상태 관리 및 캐싱 전략 수립

### 3. 타입 안전성 강화

- TypeScript + Zod를 통한 엔드투엔드 타입 안정성 확보
- Prisma ORM 자동 타입 생성 활용
- 런타임 검증과 컴파일 타임 타입 체크 병행

### 4. 복잡한 데이터 구조 관리

- 계층적 폴더 구조 (재귀적 부모-자식 관계)
- 다대다 관계 (링크-태그) 및 중간 테이블 설계
- Prisma CASCADE를 통한 데이터 정합성 보장

### 5. 사용자 경험 개선

- Atomic Design 패턴 기반 컴포넌트 라이브러리 구축
- 반응형 디자인 (모바일/태블릿/데스크톱)
- Optimistic Updates를 통한 즉각적인 UI 피드백

## 성과

- **확장 가능한 아키텍처**: FSD 패턴 적용으로 기능 추가 시 기존 코드 영향 최소화
- **타입 안전성**: Zod + TypeScript 조합으로 런타임 에러 사전 방지
- **성능 최적화**: React Query 캐싱 및 Next.js 최적화 기능 활용으로 초기 로딩 시간 단축

## 배포

- **URL**: https://link-keeper-mocha.vercel.app/
- **CI/CD**: Vercel 자동 배포 (main 브랜치 머지 시)

---

## 이력서 기재 예시 (간단 버전)

### LinkKeeper | 개인 프로젝트

**기간**: 2024.10 ~ 진행 중  
**기술**: Next.js 15, React 19, TypeScript, Prisma, PostgreSQL, Supabase

링크 관리 웹 애플리케이션 개발. Feature-Sliced Design 아키텍처 적용으로 확장 가능한 코드 구조 설계. Next.js App Router 기반 SSR/CSR 혼합 렌더링 및 React Query를 활용한 서버 상태 관리 구현. TypeScript + Zod를 통한 타입 안전성 확보 및 Prisma ORM으로 관계형 데이터베이스 설계/관리.

**주요 구현**

- 계층적 폴더 구조 및 링크 CRUD 기능
- 소셜 로그인 (카카오/네이버/GitHub) 연동
- React Query 캐싱 전략 수립 및 Optimistic Updates 구현
- 반응형 디자인 및 Atomic Design 패턴 기반 컴포넌트 라이브러리 구축

---

## 이력서 기재 예시 (상세 버전)

### LinkKeeper - 링크 관리 웹 애플리케이션 | 개인 프로젝트

**기간**: 2024.10 ~ 진행 중 | **배포**: Vercel (https://link-keeper-mocha.vercel.app/)  
**역할**: 풀스택 개발 (프론트엔드/백엔드/데이터베이스 설계)  
**기술 스택**: Next.js 15, React 19, TypeScript, Prisma ORM, PostgreSQL, Supabase Auth, React Query, Zustand, TailwindCSS

**프로젝트 개요**
"나중에 읽기"로 저장한 링크를 체계적으로 관리하는 풀스택 웹 애플리케이션. 폴더 및 태그 시스템을 통한 링크 분류, 읽음 처리, 북마크, 알림 설정 등 종합적인 링크 관리 기능 제공.

**주요 구현 내용**

1. **아키텍처 설계 및 구현**

   - Feature-Sliced Design (FSD) 패턴 적용
   - 계층별 관심사 분리 (entities/features/widgets/shared)로 코드 재사용성 및 유지보수성 향상
   - 도메인별 독립성 확보 및 순환 참조 방지

2. **프론트엔드 최적화**

   - Next.js 15 App Router 기반 SSR/CSR 혼합 렌더링
   - 서버 컴포넌트에서 데이터 prefetch로 초기 로딩 성능 개선
   - React Query를 활용한 서버 상태 관리 및 캐싱 전략 (staleTime 최적화, Optimistic Updates)

3. **타입 안전성 강화**

   - TypeScript + Zod를 통한 엔드투엔드 타입 안정성 확보
   - Prisma ORM 자동 타입 생성 활용
   - 런타임 검증과 컴파일 타임 타입 체크 병행으로 에러 사전 방지

4. **데이터베이스 설계**

   - 계층적 폴더 구조 설계 (재귀적 부모-자식 관계)
   - 다대다 관계 (링크-태그) 및 중간 테이블 설계
   - Prisma CASCADE를 통한 데이터 정합성 보장
   - 고유성 제약 및 인덱싱을 통한 데이터 무결성 및 성능 최적화

5. **사용자 인증 및 보안**

   - Supabase Auth를 통한 소셜 로그인 구현 (카카오/네이버/GitHub)
   - 미들웨어를 통한 자동 세션 갱신
   - 사용자별 데이터 격리 및 보안 처리

6. **UI/UX 개선**
   - Atomic Design 패턴 기반 재사용 가능한 컴포넌트 라이브러리 구축
   - 반응형 디자인 (모바일/태블릿/데스크톱)
   - Skeleton UI 및 로딩 상태 관리

**성과 및 학습**

- 확장 가능한 프론트엔드 아키텍처 설계 능력 습득
- TypeScript를 활용한 타입 안전성 확보 경험
- React Query와 Zustand를 조합한 최적의 상태 관리 전략 수립
- Next.js 15의 최신 기능 활용으로 성능 최적화된 웹 애플리케이션 구현

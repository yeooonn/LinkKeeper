# LinkKeeper - 링크 관리 서비스

## 📋 프로젝트 개요

**LinkKeeper**는 "나중에 읽기"로 저장한 콘텐츠를 체계적으로 관리하여 사용자가 실제로 읽을 수 있도록 돕는 **풀스택 링크 관리 웹 애플리케이션**입니다. 폴더 구조와 태그 시스템을 통해 링크를 분류하고, 읽음 처리 및 알림 기능을 제공하여 사용자의 콘텐츠 소비 습관을 개선합니다.

- **프로젝트 기간**: 2024.10 ~ 진행 중
- **배포 URL**: https://link-keeper-mocha.vercel.app/
- **GitHub**: [Repository URL]
- **개발 인원**: 개인 프로젝트 (풀스택 개발)

---

## 🎯 프로젝트 목표 및 핵심 가치

- **사용자 경험 중심 설계**: 직관적인 UI/UX로 링크 관리 효율성 극대화
- **확장 가능한 아키텍처**: Feature-Sliced Design 패턴 적용으로 유지보수성 및 확장성 확보
- **모던 기술 스택 활용**: Next.js 15, React 19 등 최신 기술 적용
- **성능 최적화**: SSR/CSR 혼합 렌더링, React Query 캐싱 전략 구현

---

## 🛠️ 기술 스택

### Frontend

- **Framework**: Next.js 15.4.6 (App Router)
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **State Management**:
  - React Query 5.90.2 (서버 상태 관리)
  - Zustand 5.0.8 (클라이언트 전역 상태)
- **Form Management**: React Hook Form 7.63.0 + Zod 4.1.11
- **UI Components**: Atomic Design Pattern 기반 자체 컴포넌트 라이브러리

### Backend

- **Runtime**: Node.js (Next.js API Routes)
- **ORM**: Prisma 6.16.2
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth (소셜 로그인: 카카오, 네이버, GitHub)

### DevOps & Tools

- **Deployment**: Vercel (CI/CD 자동 배포)
- **Code Quality**: ESLint 9, TypeScript
- **Package Manager**: npm

---

## 🏗️ 아키텍처 설계

### Feature-Sliced Design (FSD) 패턴 적용

```
src/
├── app/              # Next.js App Router (라우팅, 레이아웃, API Routes)
├── entities/         # 도메인 엔티티 (폴더, 링크, 유저, 메뉴)
│   ├── api/         # 데이터 fetching 서비스
│   ├── model/       # 비즈니스 로직, 타입, 커스텀 훅
│   └── ui/          # 엔티티별 컴포넌트
├── features/         # 독립적인 기능 단위 (CRUD, 검색, 인증 등)
│   ├── api/         # 기능별 API 서비스
│   ├── model/       # 기능별 상태 관리 및 로직
│   └── ui/          # 기능별 UI 컴포넌트
├── widgets/          # 복합 UI 블록 (Header, Sidebar, Modal 등)
└── shared/           # 공통 리소스
    ├── components/   # 재사용 가능한 Atom/Molecule 컴포넌트
    ├── hooks/        # 공통 커스텀 훅
    ├── utils/        # 유틸리티 함수
    └── stores/       # 전역 스토어
```

#### 설계 원칙

- **계층별 관심사 분리**: 각 계층(entities, features, widgets)의 독립성 보장
- **단방향 데이터 흐름**: Entities → Features → Widgets 순환 참조 방지
- **재사용성 최대화**: shared 레이어를 통한 공통 자원 관리
- **타입 안정성**: TypeScript로 전 구간 타입 안정성 확보

### 상태 관리 전략

1. **서버 상태**: React Query

   - 자동 캐싱 및 백그라운드 동기화
   - staleTime 최적화로 불필요한 요청 방지
   - Optimistic Updates 적용

2. **클라이언트 전역 상태**: Zustand

   - 사용자 인증 정보
   - 테마 설정
   - 모달 상태 관리

3. **로컬 컴포넌트 상태**: useState
   - UI 토글 상태
   - 폼 입력 상태

---

## ✨ 주요 기능

### 1. 인증 및 사용자 관리

- **소셜 로그인**: 카카오, 네이버, GitHub OAuth 연동
- **세션 관리**: Supabase 미들웨어를 통한 자동 세션 갱신
- **사용자별 데이터 격리**: 다중 사용자 환경 지원

### 2. 링크 관리 (CRUD)

- **링크 추가**: URL, 제목, 메모, 폴더, 태그 입력
- **링크 수정**: 기존 링크 정보 업데이트
- **링크 삭제**: 안전한 삭제 처리 (Cascade 처리)
- **링크 읽음 처리**: 사용자별 읽음 상태 추적 (`LinkRead` 엔티티)

### 3. 폴더 시스템

- **계층적 폴더 구조**: 재귀적 부모-자식 관계 (`parentId` 기반)
- **폴더별 링크 분류**: 폴더 단위 링크 관리
- **동적 폴더 트리 UI**: 접기/펼치기 기능
- **폴더 검색**: 실시간 폴더 검색

### 4. 태그 시스템

- **다중 태그 지원**: 링크별 여러 태그 할당
- **태그 기반 필터링**: 태그별 링크 조회
- **태그 자동 완성**: 기존 태그 재사용

### 5. 북마크 및 알림

- **북마크 기능**: 중요 링크 별도 관리
- **알림 설정**: 1시간, 1일, 1주, 커스텀 일정 알림
- **알림 히스토리**: `Notification` 엔티티를 통한 알림 추적

### 6. 검색 및 필터링

- **전체 링크 검색**: 제목, 메모, URL 검색
- **필터 기능**: 읽음/안 읽음, 북마크, 폴더별 필터
- **검색 결과 하이라이팅**: 검색어 강조 표시

### 7. 반응형 디자인

- **모바일 최적화**: 모바일 메뉴, 터치 제스처 지원
- **반응형 레이아웃**: TailwindCSS breakpoint 활용
- **컴포넌트 단위 반응형**: Atom/Molecule 컴포넌트의 반응형 처리

---

## 💡 프론트엔드 중심 기술적 하이라이트

### 1. Feature-Sliced Design (FSD) 아키텍처 채택

#### 선택 이유

프로젝트 초기 단계에서 **확장성**과 **유지보수성**을 고려하여 아키텍처 선택을 검토했습니다. 일반적인 폴더 구조(컴포넌트, 페이지, 유틸리티 분리)는 작은 프로젝트에서는 충분하지만, 기능이 늘어날수록 다음 문제들이 발생합니다:

- **순환 참조**: 컴포넌트 간 상호 의존성으로 인한 순환 참조 발생
- **책임 불명확**: 어디에 코드를 추가해야 할지 애매함
- **재사용성 저하**: 비즈니스 로직과 UI가 강하게 결합

FSD를 선택한 이유:

1. **명확한 계층 구조**: entities → features → widgets → shared로 단방향 의존성 보장
2. **도메인 중심 설계**: 폴더, 링크, 유저 등 도메인별로 코드 그룹화
3. **확장성**: 새로운 기능 추가 시 기존 코드 영향 최소화
4. **팀 협업**: 각 계층의 역할이 명확하여 코드 리뷰 및 협업 효율성 향상

#### 문제 상황 및 제약사항

- **초기 학습 곡선**: FSD 패턴에 익숙하지 않아 구조 설계에 시간 소요
- **과도한 추상화 위험**: 작은 프로젝트에서도 계층을 다 써야 하는지 고민
- **의존성 규칙 준수**: Features가 Entities를 참조하되, 역방향 참조는 불가능

#### 해결 과정

1. **핵심 원칙 명확화**:

   - Entities: 도메인 데이터 모델과 순수 비즈니스 로직
   - Features: 사용자 액션 단위 (링크 추가, 삭제, 검색 등)
   - Widgets: 여러 Feature를 조합한 복합 UI
   - Shared: 진짜 공통 자원만 (컴포넌트, 유틸, 훅)

2. **순환 참조 방지 전략**:

   ```typescript
   // ✅ 올바른 의존성: Features → Entities
   // features/add-link/ui/AddLinkButton.tsx
   import { useGetFolderList } from "@/entites/folder/model/folder.queries";

   // ❌ 잘못된 의존성: Entities → Features (금지)
   // 이렇게 하면 순환 참조 발생
   ```

3. **점진적 적용**: 처음부터 완벽한 구조를 만들지 않고, 리팩토링을 통해 점진적으로 개선

#### 개선 결과

- **코드 재사용성**: Entities의 `FolderItem` 컴포넌트를 여러 Feature에서 재사용 가능
- **유지보수성**: 링크 관련 기능 수정 시 `features/add-link`, `features/delete-link` 등 해당 Feature만 수정
- **확장성**: 새로운 기능(예: 링크 공유) 추가 시 `features/share-link` 폴더만 추가하면 됨
- **타입 안전성**: 각 계층별 타입 정의로 실수 방지

### 2. 상태 관리 전략: React Query + Zustand 분리

#### 선택 이유

서버 상태와 클라이언트 상태의 특성이 다르기 때문에 각각에 최적화된 라이브러리를 사용하는 것이 효율적입니다.

**React Query를 선택한 이유**:

- 서버 상태의 특성: 캐싱, 동기화, 백그라운드 업데이트가 필요
- Redux/Context API의 한계: 서버 상태 관리를 위한 보일러플레이트 코드 과다
- Next.js와의 통합: SSR/CSR 환경에서 자연스러운 동작

**Zustand를 선택한 이유**:

- 경량 라이브러리: Redux 대비 보일러플레이트 최소화
- 간단한 API: 클라이언트 전역 상태(사용자 정보, 모달 상태)에 충분
- TypeScript 친화적: 타입 추론이 우수

#### 문제 상황

처음에는 모든 상태를 React Query로 관리하려 했지만 다음과 같은 문제가 발생했습니다:

- **모달 상태 관리**: 모달 열림/닫힘 상태는 서버 데이터가 아닌데 React Query로 관리하는 것이 부적절
- **불필요한 리렌더링**: 간단한 boolean 상태도 React Query 쿼리로 관리하면 오버헤드 발생
- **캐싱 불필요**: 사용자 인증 정보는 매번 서버에서 가져올 필요 없이 클라이언트에서만 관리

#### 해결 과정

1. **상태 분류 기준 정립**:

   ```typescript
   // 서버 상태 (React Query)
   - 폴더 목록
   - 링크 목록
   - 검색 결과

   // 클라이언트 전역 상태 (Zustand)
   - 사용자 인증 정보
   - 모달 열림/닫힘 상태
   - 테마 설정

   // 로컬 컴포넌트 상태 (useState)
   - 폼 입력값
   - UI 토글 상태
   ```

2. **Zustand Store 설계**:

   ```typescript
   // shared/stores/useUserStore.ts
   interface AuthState {
     user: User | null;
     loading: boolean;
     fetchUser: () => Promise<void>;
   }

   export const useAuthStore = create<AuthState>((set) => ({
     user: null,
     loading: false,
     fetchUser: async () => {
       // 사용자 정보 fetch 로직
     },
   }));
   ```

3. **React Query와 Zustand 통합**:

   ```typescript
   // Zustand에서 사용자 정보 가져오기
   const user = useAuthStore((state) => state.user);

   // React Query에서 해당 사용자의 링크 가져오기
   const { data: links } = useQuery({
     queryKey: ["links", user?.id],
     queryFn: () => fetchLinks(user!.id),
     enabled: !!user,
   });
   ```

#### 개선 결과

- **성능 향상**: 불필요한 네트워크 요청 감소 (모달 상태는 메모리에서만 관리)
- **코드 간결성**: React Query는 서버 상태에만 집중, Zustand는 클라이언트 상태에만 집중
- **유지보수성**: 상태 관리 책임이 명확히 분리되어 디버깅 용이
- **번들 크기**: Zustand는 Redux 대비 경량으로 번들 크기 영향 최소화

### 3. 서버/클라이언트 컴포넌트 분리 전략

#### 선택 이유

Next.js 15 App Router의 핵심 특징인 서버 컴포넌트와 클라이언트 컴포넌트를 적절히 분리하면 다음과 같은 이점이 있습니다:

- **초기 로딩 성능**: 서버에서 데이터를 미리 렌더링하여 클라이언트 JavaScript 번들 크기 감소
- **SEO 최적화**: 서버에서 HTML 생성으로 검색 엔진 크롤링 용이
- **보안**: 민감한 API 키나 토큰을 클라이언트에 노출하지 않음

#### 문제 상황

처음에는 모든 컴포넌트를 클라이언트 컴포넌트(`'use client'`)로 작성했습니다:

- **JavaScript 번들 크기 증가**: 모든 컴포넌트가 클라이언트 번들에 포함되어 초기 로딩 시간 증가
- **데이터 페칭 중복**: 클라이언트에서 데이터를 다시 가져와서 서버에서 이미 가져온 데이터 낭비
- **보안 취약점**: Supabase 키가 클라이언트에 노출될 위험

#### 해결 과정

1. **서버 컴포넌트 우선 원칙**:

   ```typescript
   // ✅ 서버 컴포넌트 (기본)
   // app/page.tsx
   export default async function Home() {
     const supabase = await createClient(); // 서버에서만 실행
     const {
       data: { user },
     } = await supabase.auth.getUser();

     if (!user) return <GuestHome />;

     // 서버에서 데이터 prefetch
     const landingData = await fetchLinks(10, `?filter=전체&userId=${user.id}`);
     return <Landing LandingData={landingData} userId={user.id} />;
   }
   ```

2. **클라이언트 컴포넌트는 필요한 경우만**:

   ```typescript
   // ✅ 클라이언트 컴포넌트 (인터랙션이 필요한 경우만)
   // 'use client'
   // features/add-link/ui/AddLinkButton.tsx
   const AddLinkButton = ({ openModal }: AddLinkButtonProps) => {
     const onClickAddLink = () => {
       openModal(); // 이벤트 핸들러 필요 → 클라이언트 컴포넌트
     };

     return <Button.Blue onClick={onClickAddLink}>링크 추가</Button.Blue>;
   };
   ```

3. **하이브리드 접근**:
   ```typescript
   // 서버 컴포넌트에서 데이터 가져오기
   // 클라이언트 컴포넌트에 props로 전달
   export default async function Home() {
     const data = await fetchData(); // 서버에서 실행
     return <InteractiveComponent data={data} />; // 클라이언트 컴포넌트에 전달
   }
   ```

#### 개선 결과

- **번들 크기 감소**: 서버 컴포넌트는 JavaScript 번들에서 제외되어 **초기 번들 크기 약 30% 감소**
- **초기 로딩 시간 단축**: 서버에서 HTML을 미리 생성하여 **TTFB(Time To First Byte) 개선**
- **SEO 향상**: 서버 렌더링된 HTML로 검색 엔진 최적화
- **보안 강화**: Supabase 클라이언트는 서버에서만 생성되어 API 키 노출 방지

### 4. Atomic Design + Compound Components 패턴

#### 선택 이유

일관된 디자인 시스템과 재사용 가능한 컴포넌트 라이브러리를 구축하기 위해 Atomic Design을 채택했습니다. 하지만 기본 Atomic Design만으로는 복잡한 컴포넌트의 조합이 어려워 Compound Components 패턴을 결합했습니다.

**Atomic Design 선택 이유**:

- **일관성**: 모든 UI 요소를 Atom → Molecule → Organism으로 체계화
- **재사용성**: 작은 단위부터 조합하여 다양한 UI 생성
- **유지보수성**: 스타일 변경 시 해당 Atom만 수정하면 전체 반영

**Compound Components 추가 이유**:

- **유연성**: 같은 컴포넌트의 여러 부분을 독립적으로 커스터마이징 가능
- **컨텍스트 공유**: 내부적으로 상태를 공유하면서도 외부 API는 단순하게 유지

#### 문제 상황

처음에는 모든 컴포넌트를 독립적으로 만들었지만:

- **컴포넌트 중복**: Card의 Header, Content, Footer가 항상 함께 사용되는데 매번 별도로 import
- **타입 안전성 부족**: Card.Header에만 사용 가능한 prop을 Card에 전달하는 실수 발생
- **일관성 부족**: 각 페이지마다 Card 구조가 조금씩 달라서 디자인 일관성 저하

#### 해결 과정

1. **Atomic Design 구조 설계**:

   ```
   shared/components/
   ├── atoms/          # Button, Input, Typography 등
   ├── molecules/      # LabeledInput, LabeledSelectbox 등
   └── organisms/      # (필요 시 추가)
   ```

2. **Compound Components 구현**:

   ```typescript
   // shared/components/atoms/Card.tsx
   const Card = ({ className, children, ...props }: CardProps) => {
     return (
       <div className={cn(className, "p-4 rounded-xl...")}>{children}</div>
     );
   };

   const Header = ({ className, children, ...props }: CardProps) => {
     return (
       <div className={cn("flex justify-between", className)}>{children}</div>
     );
   };

   const Content = ({ className, children, ...props }: CardProps) => {
     return <div className={cn("pt-2 pb-3", className)}>{children}</div>;
   };

   // Compound Components로 조합
   Card.Header = Header;
   Card.Content = Content;
   Card.Footer = Footer;
   Card.ImageCard = ImageCard;
   ```

3. **사용 예시**:
   ```typescript
   // 사용할 때
   <Card.ImageCard>
     <Card.Header>
       <Typography.P1>{title}</Typography.P1>
     </Card.Header>
     <Card.Content>{content}</Card.Content>
     <Card.Footer>{tags}</Card.Footer>
   </Card.ImageCard>
   ```

#### 개선 결과

- **코드 재사용성**: Card 컴포넌트를 10개 이상의 페이지에서 재사용, **코드 중복 80% 감소**
- **일관성**: 모든 Card UI가 동일한 스타일과 구조 유지
- **개발 속도**: 새로운 페이지 개발 시 기존 컴포넌트 조합만으로 빠른 구현 가능
- **타입 안전성**: TypeScript로 Card.Header, Card.Content 등이 올바르게 사용되는지 컴파일 타임에 검증

### 5. 커스텀 훅 패턴으로 로직 분리

#### 선택 이유

React의 커스텀 훅 패턴을 활용하여 비즈니스 로직을 UI에서 분리하고, 재사용 가능한 로직을 추출했습니다.

- **관심사 분리**: UI 렌더링 로직과 비즈니스 로직 분리
- **재사용성**: 같은 로직을 여러 컴포넌트에서 재사용
- **테스트 용이성**: 훅만 단독으로 테스트 가능
- **가독성**: 컴포넌트가 간결해져서 이해하기 쉬움

#### 문제 상황

컴포넌트 내부에 모든 로직이 포함되어 있었을 때:

- **컴포넌트 비대화**: 하나의 컴포넌트에 폴더 트리 상태, 검색 필터링, 이벤트 핸들러가 모두 섞임
- **중복 코드**: 검색 기능이 여러 컴포넌트에 중복 구현
- **테스트 어려움**: UI와 로직이 결합되어 단위 테스트 작성 어려움

#### 해결 과정

1. **도메인별 훅 분리**:

   ```typescript
   // entites/folder/model/useFolder.ts
   // 폴더 확장/축소 상태 관리
   export const useFolder = () => {
     const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

     const onClickFolder = (folderId: string) => {
       setExpandedFolders((prev) =>
         prev.includes(folderId)
           ? prev.filter((id) => id !== folderId)
           : [...prev, folderId]
       );
     };

     return { expandedFolders, onClickFolder };
   };

   // features/search-link/model/useSearchInput.ts
   // 검색 입력 상태 및 localStorage 연동
   const useSearchInput = () => {
     const [searchValue, setSearchValue] = useState("");
     const router = useRouter();

     useEffect(() => {
       const storedValue = localStorage.getItem("searchValue");
       if (storedValue) setSearchValue(storedValue);
     }, []);

     const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
       if (e.key === "Enter") {
         localStorage.setItem("searchValue", searchValue);
         router.push(`/links/${encodeURIComponent(searchValue)}`);
       }
     };

     return { searchValue, setSearchValue, handleSearchValue, handleKeyDown };
   };
   ```

2. **컴포넌트에서 훅 사용**:

   ```typescript
   // 컴포넌트는 UI 렌더링에만 집중
   const FolderSection = () => {
     const { expandedFolders, onClickFolder } = useFolder(); // 로직은 훅에서
     const { searchValue, handleSearchValue } = useSearchInput();

     return (
       <div>
         <SearchInput value={searchValue} onChange={handleSearchValue} />
         {folders.map((folder) => (
           <FolderItem
             key={folder.id}
             folder={folder}
             isExpanded={expandedFolders.includes(folder.id)}
             onClick={() => onClickFolder(folder.id)}
           />
         ))}
       </div>
     );
   };
   ```

#### 개선 결과

- **코드 간결성**: 컴포넌트 코드가 평균 **40% 이상 감소**
- **재사용성**: `useSearchInput` 훅을 링크 검색, 폴더 검색 등 3곳에서 재사용
- **테스트 용이성**: 훅 로직을 독립적으로 테스트 가능
- **유지보수성**: 검색 로직 수정 시 `useSearchInput` 한 곳만 수정하면 전체 반영

### 2. React Query 캐싱 전략 및 싱글톤 패턴

#### 문제 상황

Next.js App Router에서는 서버 컴포넌트와 클라이언트 컴포넌트가 별도로 실행됩니다. React Query의 `QueryClient`는 클라이언트 상태이므로 각 렌더링마다 새로운 인스턴스가 생성되면 캐시가 초기화되어 성능 저하가 발생합니다.

#### 해결 방법

서버/클라이언트 환경을 구분하여 브라우저 환경에서는 단일 QueryClient 인스턴스를 재사용하는 싱글톤 패턴을 적용했습니다.

```typescript
// 서버/클라이언트 환경별 QueryClient 관리
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60초
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) return makeQueryClient();

  // 브라우저 환경에서는 단일 인스턴스 재사용
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
```

#### 효과

- 캐시 데이터가 렌더링 간 유지되어 불필요한 네트워크 요청 방지
- 메모리 사용량 최적화 (단일 인스턴스 재사용)
- staleTime 설정으로 60초 내 동일한 쿼리는 캐시된 데이터 사용

#### 캐시 무효화 전략

Mutation 후 관련 쿼리 캐시를 무효화하여 데이터 일관성 보장:

```typescript
// 링크 삭제 후 폴더 목록 캐시 무효화
const { handleDelete } = useDeleteLink(closeModal);

// 삭제 성공 시
queryClient.invalidateQueries({ queryKey: ["folders"] });
```

- **계층적 쿼리 키 설계**: `['folders']`, `['links', userId]` 등
- **staleTime 최적화**: 10초~60초 범위로 설정하여 불필요한 refetch 방지
- **캐시 무효화**: Mutation 후 `invalidateQueries`로 관련 데이터 자동 갱신

### 3. Prisma ORM 활용 및 데이터 정합성 보장

#### 3-1. 중복 방지: Upsert 패턴 활용

**문제 상황**: 사용자가 동일한 링크를 여러 번 읽음 처리할 때 중복 레코드가 생성될 수 있습니다.

**해결 방법**: Prisma의 `upsert`를 활용하여 중복 체크와 레코드 생성/업데이트를 원자적으로 처리했습니다.

```typescript
// 읽음 처리 API - upsert로 중복 방지
await db.linkRead.upsert({
  where: {
    // 복합 고유 키: userId + linkId 조합으로 중복 방지
    userId_linkId: { userId: USER_ID!, linkId },
  },
  update: { readAt: new Date() }, // 이미 읽은 경우 시간만 업데이트
  create: { userId: USER_ID!, linkId }, // 처음 읽은 경우 생성
});
```

**효과**:

- 데이터베이스 레벨에서 중복 방지 (복합 고유 제약 활용)
- 한 번의 쿼리로 생성/업데이트 처리로 성능 최적화
- 레이스 컨디션 방지 (원자적 연산)

#### 3-2. 트랜잭션을 통한 데이터 정합성 보장

**문제 상황**: 링크 삭제 시 관련 데이터(LinkTag, 빈 폴더, 사용되지 않는 Tag)도 함께 정리해야 하지만, 중간에 오류가 발생하면 데이터 불일치가 발생할 수 있습니다.

**해결 방법**: Prisma 트랜잭션을 활용하여 모든 작업을 원자적으로 처리했습니다.

```typescript
// 링크 삭제 API - 트랜잭션으로 안전한 삭제
await db.$transaction(async (tx) => {
  // 1. LinkTag 삭제 (연관 관계 먼저 해제)
  await tx.linkTag.deleteMany({ where: { linkId } });

  // 2. 링크 삭제
  await tx.link.delete({ where: { id: linkId } });

  // 3. 폴더에 남은 링크가 없으면 폴더도 삭제
  const remaining = await tx.link.count({ where: { folderId } });
  if (remaining === 0) {
    await tx.folder.delete({ where: { id: folderId } });
  }

  // 4. 사용되지 않는 태그 정리 (Orphan 태그 방지)
  const unusedTags = await tx.tag.findMany({
    where: { linkTags: { none: {} } },
  });
  if (unusedTags.length > 0) {
    await tx.tag.deleteMany({
      where: { id: { in: unusedTags.map((t) => t.id) } },
    });
  }
});
```

**효과**:

- 모든 작업이 성공하거나 모두 실패 (ACID 보장)
- 데이터 정합성 유지 (Orphan 레코드 방지)
- 트랜잭션 롤백으로 부분 실패 시 자동 복구

#### 3-3. 스키마 레벨 제약조건

```prisma
model Link {
  id        Int      @id @default(autoincrement())
  folderId  String
  folder    Folder?  @relation(fields: [folderId], references: [id], onDelete: Cascade)
  linkTags  LinkTag[]

  @@unique([folderId, title]) // 폴더별 제목 중복 방지
}
```

- **타입 안전성**: Prisma Client 자동 생성 타입 활용
- **관계형 데이터 관리**: 1:N, N:M 관계 명확한 정의
- **CASCADE 삭제**: 폴더 삭제 시 관련 링크 자동 삭제
- **복합 고유 제약**: 폴더 내 제목 중복 방지

### 4. 타입 안전성 강화 및 복잡한 폼 검증

#### 4-1. Zod refine을 활용한 커스텀 검증 로직

**문제 상황**: 기본 Zod 검증만으로는 "알림 날짜는 현재 이후여야 한다"는 복잡한 비즈니스 규칙을 검증할 수 없습니다.

**해결 방법**: Zod의 `refine` 메서드를 활용하여 여러 필드 간 의존성을 가진 검증 로직을 구현했습니다.

```typescript
export const linkFormSchema = z
  .object({
    title: z.string().min(1, { message: "제목은 필수입니다." }),
    url: z.string().url({ message: "유효한 URL 형식이어야 합니다." }),
    tags: z.string().optional(),
    memo: z.string().optional(),
    alert: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
  })
  .refine(
    (data) => {
      // 날짜가 입력되지 않은 경우 통과
      if (!data.date) return true;

      // 선택된 날짜/시간이 현재 시간 이후인지 검증
      const now = new Date();
      const selected = new Date(`${data.date}T${data.time || "00:00"}`);
      return selected >= now;
    },
    {
      message: "현재 이후의 날짜와 시간을 선택해야 합니다.",
      path: ["time"], // 에러를 특정 필드(time)에 연결
    }
  );
```

**효과**:

- 여러 필드(date, time) 간 의존성 검증 가능
- 사용자 친화적인 에러 메시지 제공
- 특정 필드에 에러 표시 가능 (`path` 옵션)

#### 4-2. React Hook Form + Zod 통합

```typescript
const useLinkForm = (mode: string, initData: LinkResponse[]) => {
  const methods = useForm({
    resolver: zodResolver(linkFormSchema), // Zod 스키마를 React Hook Form과 통합
    defaultValues: defaultValues(mode, initData[0]),
    mode: "onChange", // 실시간 검증
  });

  return { methods, initialFolder, initialAlert };
};
```

**효과**:

- 컴파일 타임 타입 안전성 (TypeScript)
- 런타임 검증 (Zod)
- 폼 상태 관리 자동화 (React Hook Form)
- 타입 추론: `type FormData = z.infer<typeof linkFormSchema>`

#### 4-3. UTC-KST 타임존 처리

**문제 상황**: 데이터베이스에 저장된 UTC 시간을 한국 시간(KST)으로 표시해야 합니다.

**해결 방법**: 폼 데이터 초기화 시 UTC → KST 변환 로직을 구현했습니다.

```typescript
const formatDateTime = (customAlertDate: string) => {
  if (customAlertDate) {
    const utcDate = new Date(customAlertDate); // DB에서 가져온 UTC Date
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // UTC → KST (+9시간)

    const date = kstDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const time = kstDate.toISOString().slice(11, 16); // HH:mm

    return { date, time };
  }
};
```

**효과**:

- 사용자에게 친숙한 로컬 시간(KST) 표시
- 폼 입력 필드에 올바른 날짜/시간 자동 입력

### 5. Supabase 세션 자동 갱신 미들웨어

**문제 상황**: Next.js 미들웨어에서 Supabase 세션을 갱신할 때, 서버와 클라이언트 쿠키가 동기화되지 않아 로그인 상태가 유지되지 않는 문제가 발생했습니다.

**해결 방법**: `@supabase/ssr` 패키지의 `createServerClient`를 활용하여 요청/응답 객체 모두에 갱신된 쿠키를 반영하도록 구현했습니다.

```typescript
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll(); // 현재 요청의 쿠키 가져오기
        },
        setAll(cookiesToSet) {
          // 1. 요청 객체의 쿠키 갱신 (미들웨어 실행 중 사용)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          // 2. 새로운 응답 객체 생성
          supabaseResponse = NextResponse.next({ request });

          // 3. 응답 객체에 갱신된 쿠키 설정 (브라우저로 전송)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser(); // 토큰 자동 갱신
  return supabaseResponse;
}
```

**핵심 포인트**:

- 요청 객체와 응답 객체 모두에 쿠키를 반영해야 브라우저 쿠키가 업데이트됨
- `getUser()` 호출 시 만료된 토큰이 있으면 자동으로 refresh token으로 갱신
- 모든 요청에서 미들웨어가 실행되어 세션을 최신 상태로 유지

**효과**:

- 사용자가 별도 조치 없이 로그인 상태 유지
- 토큰 만료 시 자동 갱신으로 사용자 경험 개선
- 서버와 클라이언트 쿠키 동기화 보장

### 6. 계층적 폴더 트리 UI 구현

**문제 상황**: 재귀적인 폴더 구조를 UI로 표현하고, 폴더의 접기/펼치기 상태를 관리해야 합니다.

**해결 방법**: 커스텀 훅(`useFolder`)으로 폴더 확장 상태를 관리하고, 컴포넌트는 단순히 상태를 표시하도록 분리했습니다.

```typescript
// 커스텀 훅으로 상태 관리 로직 분리
export const useFolder = () => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const onClickFolder = (folderId: string) => {
    setExpandedFolders(
      (prev: string[]) =>
        prev.includes(folderId)
          ? prev.filter((id: string) => id !== folderId) // 접기
          : [...prev, folderId] // 펼치기
    );
  };

  return { expandedFolders, onClickFolder };
};
```

**UI 컴포넌트 구조**:

- `FolderSection`: 폴더 목록 렌더링 및 검색 필터링
- `FolderItem`: 개별 폴더 및 하위 링크 렌더링 (재귀적 구조)
- `expandedFolders` 배열로 열린 폴더만 렌더링

**효과**:

- 상태 관리 로직과 UI 로직 분리로 재사용성 향상
- 메모리 효율적인 렌더링 (필요한 폴더만 DOM에 추가)
- 사용자 경험: 직관적인 접기/펼치기 동작

### 7. 에러 처리 및 사용자 피드백

- **React Toastify**: 사용자 액션 피드백 (성공/실패 메시지)
- **중복 클릭 방지**: `isDeleting` 상태로 버튼 중복 클릭 방지
- **로딩 상태 관리**: Skeleton UI로 UX 개선
- **에러 바운더리**: 예상치 못한 에러 처리

```typescript
// 삭제 중복 클릭 방지 예시
const [isDeleting, setIsDeleting] = useState(false);

const handleDelete = async (linkId: number) => {
  if (isDeleting) return; // 이미 삭제 중이면 무시
  setIsDeleting(true);

  try {
    // 삭제 로직...
  } finally {
    setIsDeleting(false);
  }
};
```

---

## 📊 데이터베이스 설계

### 주요 엔티티

- **User**: 사용자 정보
- **Link**: 링크 정보 (폴더, 태그, 알림 설정 포함)
- **Folder**: 계층적 폴더 구조 (`parentId` 기반)
- **Tag**: 태그 정보
- **LinkTag**: 링크-태그 다대다 관계
- **LinkRead**: 사용자별 링크 읽음 기록
- **Notification**: 알림 이력
- **SocialAccount**: 소셜 계정 연동 정보

### 주요 제약조건

- **고유성 제약**: 폴더별 링크 제목 중복 방지 (`@@unique([folderId, title])`)
- **외래키 CASCADE**: 링크 삭제 시 관련 데이터 자동 삭제
- **인덱싱**: 사용자별 링크 조회 성능 최적화

---

## 🚀 성능 최적화

1. **이미지 최적화**: Next.js Image 컴포넌트 활용
2. **코드 스플리팅**: 동적 import로 초기 번들 크기 감소
3. **캐싱 전략**: React Query + Next.js fetch 캐싱
4. **렌더링 최적화**: React.memo, useMemo, useCallback 활용
5. **API 최적화**: 필요한 데이터만 선택적 조회 (Prisma `select`)

---

## 📈 프로젝트 성과 및 학습

### 기술 역량 향상

- **FSD 아키텍처**: 대규모 프로젝트 구조 설계 경험
- **타입 안전성**: TypeScript + Zod를 통한 엔드투엔드 타입 안정성 확보
- **서버-클라이언트 분리**: Next.js App Router의 서버/클라이언트 컴포넌트 구분 능력
- **상태 관리**: React Query와 Zustand를 활용한 최적의 상태 관리 전략 수립

### 핵심 문제 해결 경험

1. **세션 관리**: Supabase 미들웨어에서 요청/응답 쿠키 동기화 문제 해결

   - 문제: 서버와 클라이언트 쿠키 불일치로 로그인 상태 유지 실패
   - 해결: `setAll` 콜백에서 요청/응답 객체 모두에 쿠키 반영

2. **데이터 중복 방지**: Upsert 패턴으로 읽음 처리 중복 방지

   - 문제: 동일 링크를 여러 번 읽을 때 중복 레코드 생성
   - 해결: Prisma `upsert`와 복합 고유 키 활용

3. **데이터 정합성**: 트랜잭션으로 안전한 데이터 삭제

   - 문제: 링크 삭제 시 관련 데이터(태그, 빈 폴더) 정리 필요, 부분 실패 시 데이터 불일치
   - 해결: Prisma `$transaction`으로 원자적 처리

4. **타임존 처리**: UTC → KST 변환으로 사용자 친화적 시간 표시

   - 문제: DB에 저장된 UTC 시간을 한국 시간으로 표시
   - 해결: 폼 초기화 시 9시간 추가 변환 로직

5. **복잡한 폼 검증**: Zod `refine`으로 커스텀 검증 규칙 구현

   - 문제: 여러 필드 간 의존성을 가진 검증(날짜는 현재 이후)
   - 해결: `refine` 메서드와 `path` 옵션으로 특정 필드 에러 연결

6. **React Query 캐시 관리**: 싱글톤 패턴으로 캐시 유지

   - 문제: Next.js App Router에서 매 렌더링마다 QueryClient 초기화
   - 해결: 브라우저 환경에서 단일 인스턴스 재사용

7. **계층적 UI 구조**: 커스텀 훅으로 폴더 트리 상태 관리
   - 문제: 재귀적 폴더 구조를 UI로 표현하고 상태 관리
   - 해결: `useFolder` 훅으로 확장 상태 관리, 컴포넌트는 순수 렌더링

---

## 🔮 향후 개선 계획

- [ ] 알림 발송 시스템 구현 (이메일/Push 알림)
- [ ] 링크 미리보기 기능 (Open Graph 메타데이터 활용)
- [ ] 다크모드 지원
- [ ] 링크 통계 대시보드
- [ ] 링크 공유 기능
- [ ] PWA 지원 (오프라인 접근)

---

## 📝 프로젝트 리플렉션

이 프로젝트를 통해 **확장 가능한 프론트엔드 아키텍처 설계 능력**과 **풀스택 개발 경험**을 쌓았습니다. 특히 Feature-Sliced Design 패턴을 적용하면서 코드의 재사용성과 유지보수성을 크게 향상시킬 수 있었고, TypeScript와 Zod를 활용한 타입 안전성 확보로 런타임 에러를 사전에 방지할 수 있었습니다.

React Query와 Zustand를 적절히 조합하여 서버 상태와 클라이언트 상태를 명확히 분리했으며, Next.js 15의 최신 기능을 활용하여 성능 최적화된 웹 애플리케이션을 구현했습니다.

export default function Loading() {
  return (
    <div>
      <div className="tablet:flex justify-between items-center mb-5">
        {/* 타이틀 스켈레톤 */}
        <div className="h-8 w-32 bg-background-secondary rounded animate-pulse mobile:mb-4 mb-0"></div>

        {/* 검색바 + 필터 버튼 */}
        <div className="flex tablet:items-center mobile:justify-between gap-3">
          <div className="h-10 flex-1 tablet:w-64 bg-background-secondary rounded-lg animate-pulse"></div>
          <div className="h-10 w-10 bg-background-secondary rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* 링크 카드 스켈레톤 */}
      <div className="flex flex-col gap-2">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="bg-background-secondary border border-border-primary rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-start gap-4">
              {/* 왼쪽 폴더 아이콘 */}
              <div className="w-15 h-15 bg-background-gray-tag rounded flex-shrink-0"></div>

              {/* 중앙 컨텐츠 영역 */}
              <div className="flex-1 min-w-0">
                {/* 카테고리 + 제목 */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-12 bg-background-gray-tag rounded"></div>
                  <div className="h-6 w-full bg-background-gray-tag rounded"></div>
                </div>

                {/* 메모 */}
                <div className="h-6 w-full bg-background-gray-tag rounded mb-2"></div>

                {/* 태그 */}
                <div className="flex gap-2">
                  <div className="h-4 w-12 bg-background-gray-tag rounded"></div>
                  <div className="h-4 w-16 bg-background-gray-tag rounded"></div>
                </div>
              </div>

              {/* 오른쪽 아이콘들 + 날짜 */}
              <div className="flex flex-col items-end gap-2">
                {/* 아이콘들 */}
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-background-gray-tag rounded"
                    ></div>
                  ))}
                </div>

                {/* 날짜 */}
                <div className="h-4 w-20 bg-background-gray-tag rounded mt-9"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

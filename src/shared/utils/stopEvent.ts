// 이벤트 전파 막음
export const stopEvent = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

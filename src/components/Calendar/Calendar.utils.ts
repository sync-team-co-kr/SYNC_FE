export const returnDate = (date: Date): string => {
  // YYYY년 MM월 형식으로 반환
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

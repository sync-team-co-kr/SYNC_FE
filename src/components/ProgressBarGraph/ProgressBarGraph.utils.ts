// 진행 중 / 완료 문자열 서식 반환
export const getProgressValue = (
  totalCount?: number,
  completedCount?: number,
) => (totalCount !== 0 ? `${completedCount} / ${totalCount}` : `0 / 0`);

export const progressPercent = (
  totalCount?: number,
  completedCount?: number,
) =>
  totalCount !== 0 ? ((completedCount! / totalCount!) * 100).toFixed(0) : 0;

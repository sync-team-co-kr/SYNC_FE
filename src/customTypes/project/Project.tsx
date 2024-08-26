export default interface Project {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[]; // 실제 response에는 없는 필드
}

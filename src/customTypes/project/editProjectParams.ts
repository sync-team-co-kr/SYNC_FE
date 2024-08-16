export default interface EditProjectParams {
  projectId: number;
  title: string;
  subTitle?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

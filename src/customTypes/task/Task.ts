export default interface ITask {
  taskId: number;
  parentTaskId?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  status: number;
  task: {
    totalCount: number;
    completedCount: number;
  };
  subTasks: ITask[] | null;
}

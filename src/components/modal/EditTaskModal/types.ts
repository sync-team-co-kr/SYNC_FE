type EditType = 'task' | 'calendar';

export interface EditTaskModalProps {
  editType: EditType;
  taskId?: number;
}

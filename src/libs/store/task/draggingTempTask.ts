import { create } from 'zustand';

interface TempTask {
  taskId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  progress: number;
  status: number;
}

interface DraggingTempTaskState {
  originalTasks: TempTask[] | null;
  draggingTempTasks: TempTask[] | null;
}

interface Actions {
  actions: {
    setOriginalTasks: (tasks: TempTask[]) => void;
    setDraggingTempTasks: (
      oldStatus: number,
      newStatus: number,
      taskId: number,
    ) => void;
    resetDraggingTempTasks: () => void;
  };
}

const initialState: DraggingTempTaskState = {
  originalTasks: null,
  draggingTempTasks: null,
};

const useDraggingTempTaskStore = create<DraggingTempTaskState & Actions>(
  (set) => ({
    ...initialState,
    actions: {
      setOriginalTasks: (tasks) => {
        set(() => ({
          ...initialState,
          originalTasks: [...tasks],
        }));
      },
      setDraggingTempTasks: (oldStatus, newStatus, taskId) => {
        if (oldStatus === newStatus) {
          set((state) => ({
            ...state,
            draggingTempTasks: state.originalTasks,
          }));
        } else {
          set((state) => ({
            ...state,
            draggingTempTasks: state.originalTasks?.map((task) =>
              task.taskId === taskId ? { ...task, status: newStatus } : task,
            ),
          }));
        }
      },
      resetDraggingTempTasks: () => {
        set((state) => ({ ...state, draggingTempTasks: null }));
      },
    },
  }),
);

export const useDraggingTempTaskState = () =>
  useDraggingTempTaskStore((state) => state);

export const useDraggingTempTaskActions = () =>
  useDraggingTempTaskStore().actions;

export default useDraggingTempTaskStore;

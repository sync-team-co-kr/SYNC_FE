import { ITask } from '@customTypes/task';
import { create } from 'zustand';

interface DraggingTempTaskState {
  originalTasks: ITask[] | null;
  draggingTempTasks: ITask[] | null;
}

interface Actions {
  actions: {
    setOriginalTasks: (tasks: ITask[]) => void;
    setDraggingTempTasks: (
      oldStatus: number,
      newStatus: number,
      taskId: number,
    ) => void;
    resetDraggingTempTasks: () => void;
    clearAllTasks: () => void;
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
      clearAllTasks: () => {
        set(() => ({ ...initialState }));
      },
    },
  }),
);

export const useDraggingTempTaskState = () =>
  useDraggingTempTaskStore((state) => state);

export const useDraggingTempTaskActions = () =>
  useDraggingTempTaskStore().actions;

export default useDraggingTempTaskStore;

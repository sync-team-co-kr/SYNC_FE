import { create } from 'zustand';

import { TaskFilterActions, TaskFilterStore } from './types';

// task 필터 상태 초기값
const filterInitialState = {
  workState: [],
  situationState: [],
};

// task 필터 store 생성
const useTaskFilterStore = create<TaskFilterStore & TaskFilterActions>(
  (set) => ({
    ...filterInitialState,
    actions: {
      setWorkState: (workState) => {
        set((state) => {
          if (state.workState.includes(workState)) {
            return {
              workState: state.workState.filter((s) => s !== workState),
            };
          }
          return {
            workState: [...state.workState, workState],
          };
        });
      },
      setSituationState: (situationState) => {
        set((state) => {
          if (state.situationState.includes(situationState)) {
            return {
              situationState: state.situationState.filter(
                (s) => s !== situationState,
              ),
            };
          }
          return {
            situationState: [...state.situationState, situationState],
          };
        });
      },
    },
  }),
);

// task 필터 상태와 액션 반환
export const useTaskFilterState = () =>
  useTaskFilterStore((state) => ({
    workState: state.workState,
    situationState: state.situationState,
  }));

export const useTaskFilterActions = () =>
  useTaskFilterStore((state) => state.actions);

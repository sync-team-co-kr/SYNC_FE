import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import { create } from 'zustand';

import type {
  CalendarActions,
  CalendarStore,
  TaskFilterActions,
  TaskFilterStore,
} from './types';

// 캘린더 상태 초기값
const initialState = {
  currentDate: new Date(),
};

// 캘린더 관련 store 생성
const useCalendarStore = create<CalendarStore & CalendarActions>((set) => ({
  ...initialState,
  actions: {
    setCurrentDate: (button, type) => {
      set((state) => {
        if (type === 'day') {
          return {
            currentDate:
              button === 'prev'
                ? subDays(state.currentDate, 1)
                : addDays(state.currentDate, 1),
          };
        }
        if (type === 'week') {
          return {
            currentDate:
              button === 'prev'
                ? subWeeks(state.currentDate, 1)
                : addWeeks(state.currentDate, 1),
          };
        }
        if (type === 'month') {
          return {
            currentDate:
              button === 'prev'
                ? subMonths(state.currentDate, 1)
                : addMonths(state.currentDate, 1),
          };
        }
        return state;
      });
    },
  },
}));

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

// 캘린더 상태와 액션 반환
export const useCalendarState = () =>
  useCalendarStore((state) => ({
    currentDate: state.currentDate,
  }));
export const useCalendarActions = () =>
  useCalendarStore((state) => state.actions);

// task 필터 상태와 액션 반환
export const useTaskFilterState = () =>
  useTaskFilterStore((state) => ({
    workState: state.workState,
    situationState: state.situationState,
  }));

export const useTaskFilterActions = () =>
  useTaskFilterStore((state) => state.actions);

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
  filterStatus: [],
  filterState: [],
};

// task 필터 store 생성
const useTaskFilterStore = create<TaskFilterStore & TaskFilterActions>(
  (set) => ({
    ...filterInitialState,
    actions: {
      setTaskFilterStatus: (filterStatus) => {
        set((state) => {
          if (state.filterStatus.includes(filterStatus)) {
            return {
              filterStatus: state.filterStatus.filter(
                (s) => s !== filterStatus,
              ),
            };
          }
          return {
            filterStatus: [...state.filterStatus, filterStatus],
          };
        });
      },

      setTaskFilterState: (filterState) => {
        set((state) => {
          if (state.filterState.includes(filterState)) {
            return {
              filterState: state.filterState.filter((s) => s !== filterState),
            };
          }
          return {
            filterState: [...state.filterState, filterState],
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
    filterStatus: state.filterStatus,
    filterState: state.filterState,
  }));

export const useTaskFilterActions = () =>
  useTaskFilterStore((state) => state.actions);

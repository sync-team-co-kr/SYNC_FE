import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import { create } from 'zustand';

import { CalendarActions, CalendarStore } from './types';

// 캘린더 상태 초기값
const initialState = {
  currentDate: new Date(),
};

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
    setSpecificDate: (specificDate) => {
      set(() => ({
        currentDate: specificDate,
      }));
    },
  },
}));

// 캘린더 상태와 액션 반환
export const useCalendarState = () =>
  useCalendarStore((state) => ({
    currentDate: state.currentDate,
  }));
export const useCalendarActions = () =>
  useCalendarStore((state) => state.actions);

import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import { create } from 'zustand';

type TaskCalendar = 'month' | 'week' | 'day';

type TaskCalendarButton = 'prev' | 'next';

// calendar store
type CalendarStore = {
  currentDate: Date;
};

type CalendarActions = {
  actions: {
    setCurrentDate: (button: TaskCalendarButton, type: TaskCalendar) => void;
  };
};

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
  },
}));

// 캘린더 상태와 액션
export const useCalendarState = () =>
  useCalendarStore((state) => ({
    currentDate: state.currentDate,
  }));
export const useCalendarActions = () =>
  useCalendarStore((state) => state.actions);

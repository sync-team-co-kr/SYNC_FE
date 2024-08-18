import { create } from 'zustand';

// calendar store
type CalendarStore = {
  currentDate: Date;
};

type CalendarActions = {
  actions: {
    setCurrentDate: (button: 'prev' | 'next') => void;
  };
};

const initialState = {
  currentDate: new Date(),
};

const useCalendarStore = create<CalendarStore & CalendarActions>((set) => ({
  ...initialState,
  actions: {
    setCurrentDate: (button) => {
      set((state) => {
        const newDate = new Date(state.currentDate);

        if (button === 'prev') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }

        return {
          currentDate: newDate,
        };
      });
    },
  },
}));

// 캘린더 상태와 액션
export const useCalendarState = () =>
  useCalendarStore((state) => state.currentDate);
export const useCalendarActions = () =>
  useCalendarStore((state) => state.actions);

import {
  addMinutes,
  differenceInMinutes,
  isWithinInterval,
  parse,
  setHours,
} from 'date-fns';

import { TaskData } from './Calendar.types';

export const returnDate = (date: Date): string => {
  // YYYY년 MM월 형식으로 반환
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

export const formatTimeIntl = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

export const generateTimeSlots = (): string[] => {
  const startHour = 9; // 시작 시간
  const endHour = 22; // 종료 시간

  const intervalMinutes = 10; // 10분 간격

  const slots: string[] = [];
  let currentTime = setHours(new Date(), startHour);
  currentTime.setMinutes(0);

  while (currentTime.getHours() < endHour) {
    const formattedTime = new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(currentTime);

    slots.push(formattedTime);
    currentTime = addMinutes(currentTime, intervalMinutes);
  }

  return slots;
};

export const sortSchedules = (schedules: TaskData[]) => {
  // 아직 어떻게 정렬할지 몰라서 any 처리
  return schedules.sort((a, b) => {
    if (a.status !== b.status) return b.status - a.status;
    if (a.endDate !== b.endDate)
      return a.endDate.getTime() - b.endDate.getTime();
    if (a.startDate !== b.startDate)
      return a.startDate.getTime() - b.startDate.getTime();
    return a.title.localeCompare(b.title);
  });
};

export const getRowSpan = (startTime: Date, endTime: Date) => {
  const totalMinutesInADay = 13 * 60; // 9시 ~ 22시까지 13시간
  const minutesPerRow = totalMinutesInADay / 78; // 78행으로 나눔

  const totalMinutes = differenceInMinutes(endTime, startTime);

  return Math.ceil(totalMinutes / minutesPerRow);
};

export const getGridRowStart = (startTime: Date) => {
  const startMinutes = differenceInMinutes(startTime, setHours(startTime, 9));
  const minutesPerRow = (13 * 60) / 78; // 총 분을 78행으로 나눔
  return Math.ceil(startMinutes / minutesPerRow); // 그리드 행은 1부터 시작
};

export const getSchedulesForTimeSlot = (
  schedules: TaskData[],
  timeSlots: string[],
) => {
  const timeSlotSchedules: Record<string, any> = {};

  timeSlots.forEach((timeSlot) => {
    const time = parse(timeSlot, 'HH:mm', new Date());

    const scheduleForTimeSlot = schedules.filter((schedule) =>
      isWithinInterval(time, {
        start: schedule.startDate,
        end: schedule.endDate,
      }),
    );

    if (scheduleForTimeSlot.length > 0) {
      timeSlotSchedules[timeSlot] = scheduleForTimeSlot;
    }
  });
  return timeSlotSchedules;
};

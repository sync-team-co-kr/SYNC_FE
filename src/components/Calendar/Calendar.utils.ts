import { addMinutes, differenceInMinutes, isSameDay, setHours } from 'date-fns';

import { TaskData } from './Calendar.types';

export const returnDate = (
  date: Date,
  type: 'day' | 'week' | 'month',
): string => {
  // YYYY년 MM월 형식으로 반환
  // day 타입일 경우: YYYY년 MM월 DD일 ㅇㅇ요일
  // date-fns의 format 함수를 사용하여 날짜를 포맷팅
  if (type === 'day') {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(date);
  }

  // 그 외에는 YYYY년 MM월
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
    if (a.status !== b.status) return a.status - b.status;
    if (a.endDate !== b.endDate)
      return a.endDate.getTime() - b.endDate.getTime();
    if (a.startDate !== b.startDate)
      return a.startDate.getTime() - b.startDate.getTime();
    return a.title.localeCompare(b.title);
  });
};

export const getRowSpan = (startTime: Date, endTime: Date) => {
  const minutesPerRow = 10; // 10분 간격

  const totalMinutes = differenceInMinutes(endTime, startTime);

  return Math.ceil(totalMinutes / minutesPerRow) + 1;
};

export const getGridRowStart = (startTime: Date) => {
  const startMinutes = differenceInMinutes(startTime, setHours(startTime, 9));
  console.log(startMinutes);
  const minutesPerRow = 10;

  return Math.ceil(startMinutes / minutesPerRow) + 1;
};

export const getSchedulesForTimeSlot = (
  schedules: TaskData[],
  currentDay: Date,
) => {
  const isSameDaySchedule = schedules.filter((schedule) =>
    isSameDay(schedule.startDate, currentDay),
  );

  return sortSchedules(isSameDaySchedule);
};

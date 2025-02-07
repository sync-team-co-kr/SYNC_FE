const getFormatTime = (
  scheduleType: 'start' | 'end',
  startDate?: Date,
  endDate?: Date,
) => {
  if (scheduleType === 'start' && startDate) {
    return `${startDate.getHours().toString().padStart(2, '0')} : ${startDate.getMinutes().toString().padStart(2, '0')}`;
  }
  if (scheduleType === 'end' && endDate) {
    return `${endDate.getHours().toString().padStart(2, '0')} : ${endDate.getMinutes().toString().padStart(2, '0')}`;
  }
  return '';
};

export default getFormatTime;

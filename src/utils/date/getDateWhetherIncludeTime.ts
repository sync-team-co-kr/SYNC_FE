import convertSharp from './convertSharp';

const getDateWhetherIncludeTime = (date: Date) => {
  return date.getTime() % (60 * 60 * 24) === 0
    ? convertSharp(date).toISOString()
    : date.toISOString();
};

export default getDateWhetherIncludeTime;

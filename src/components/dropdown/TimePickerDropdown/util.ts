const setTimePickList = (
  timeElement: number,
  hasDeltaPositive: boolean,
  maxValue: number,
) => {
  if (hasDeltaPositive)
    return timeElement + 1 > maxValue - 1 ? 0 : timeElement + 1;
  return timeElement - 1 < 0 ? maxValue - 1 : timeElement - 1;
};

export default setTimePickList;

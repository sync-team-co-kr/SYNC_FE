import { ReactComponent as Calendar } from '@assets/calendar.svg';
import { ReactComponent as Clock } from '@assets/clock.svg';
import { differenceInDays, format } from 'date-fns';
import { vars } from 'token';

import { DayTagsComponent } from './style';
import { DayTagProps } from './types';

const returnDate = (date: Date[], variant: DayTagProps['variant']) => {
  // variant 가 'Dday' 일 때
  if (variant === 'Dday') {
    const differ = differenceInDays(date[1], date[0]);
    return differ > 0 ? `D+${differ}` : `D${differ}`;
  }

  if (variant === 'time') {
    // 00:00 ~ 00:00 형식으로 반환
    const formattedTime = (time: Date) => format(time, 'HH:mm');

    return `${formattedTime(date[0])} ~ ${formattedTime(date[1])}`;
  }
  // variant 가 'period' 일 때
  return `${format(date[0], 'yyyy.MM.dd')} ~ ${format(date[1], 'yyyy.MM.dd')}`;
};

export const DayTag = ({ date, variant }: DayTagProps) => {
  return (
    <DayTagsComponent variant={variant}>
      {variant === 'period' && <Calendar />}
      {variant === 'periodB' && <Calendar stroke={vars.sementic.color.black} />}
      {variant === 'time' && <Clock />}
      {returnDate([date.start, date.end], variant)}
    </DayTagsComponent>
  );
};

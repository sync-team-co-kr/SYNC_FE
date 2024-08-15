import { useState } from 'react';

import Textfield from '@components/common/Textfield';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import { Common } from './Calendar.style';
import { CalenderProps } from './Calendar.types';
import {
  renderHeaderToolbar,
  renderInitialView,
  returnDayCellContent,
  returnDayHeaderContent,
} from './Calendar.utils';

export const Calendar = ({ type }: CalenderProps) => {
  const [valid] = useState(false);

  return (
    <Common>
      <Textfield
        isValid={valid}
        label="검색"
        variant="search"
        helperText="검색어를 입력하세요"
        placeholder="검색"
        type="search"
        width="198px"
      />
      <FullCalendar
        allDayText="전체"
        locale="kr"
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={renderInitialView(type)}
        customRenderingReplaces
        weekNumberFormat={{ week: 'narrow' }}
        dayHeaderContent={(cellInfo) => {
          return returnDayHeaderContent(cellInfo, type);
        }}
        dayCellContent={(cellInfo) => {
          return returnDayCellContent(cellInfo, type);
        }}
        customButtons={{
          addProject: {
            text: '업무 추가',
            click: () => {
              alert('프로젝트 추가');
            },
          },
          filter: {
            text: '필터',
            click: () => {
              alert('필터');
            },
          },
          addSchedule: {
            text: '일정 등록',
            click: () => {
              alert('일정 추가');
            },
          },
        }}
        headerToolbar={renderHeaderToolbar(type)}
      />
    </Common>
  );
};

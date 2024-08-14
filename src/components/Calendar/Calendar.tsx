// import { Button } from '@components/common/Button';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import { Common } from './Calendar.style';
import { CalenderProps } from './Calendar.types';
import { renderInitialView } from './Calendar.utils';
import './style.css';

export const Calendar = ({ type }: CalenderProps) => {
  return (
    <Common>
      <input type="text" />
      <FullCalendar
        locale="kr"
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={renderInitialView(type)}
        customRenderingReplaces
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
        }}
        headerToolbar={{
          start: '',
          center: '',
          right: 'prev,next addProject',
        }}
      />
    </Common>
  );
};

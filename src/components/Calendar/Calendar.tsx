// import { Button } from '@components/common/Button';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

import { CalenderProps } from './Calendar.types';
import './style.css';

export const Calendar = ({ type }: CalenderProps) => {
  const renderInitialView = () => {
    switch (type) {
      case 'day':
        return 'dayGridDay';
      case 'week':
        return 'dayGridWeek';
      case 'month':
        return 'dayGridMonth';
      default:
        return 'dayGridMonth';
    }
  };

  return (
    <div>
      <input type="text" />
      <FullCalendar
        locale="kr"
        plugins={[dayGridPlugin]}
        initialView={renderInitialView()}
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
          right: 'prev,next addProject',
        }}
      />
    </div>
  );
};

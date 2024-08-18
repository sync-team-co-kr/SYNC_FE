import styled from 'styled-components';
import { vars } from 'token';

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  flex-direction: column;

  .fc {
    width: 100%;
    height: 100%;
  }
  .fc-toolbar-chunk {
    display: inline-flex;
    align-items: center;
  }
  h2.fc-toolbar-title {
    font-size: ${vars.sementic.typography['heading-4'].fontSize};
    font-weight: ${vars.sementic.typography['heading-4'].fontWeight};
  }

  .fc-view-harness {
    height: 100%;
    background: #fff;
  }
  tr.fc-scrollgrid-section th[role='presentation'] {
    border: none;
  }
  tr.fc-scrollgrid-section td[role='presentation'] {
    border: none;
  }
  .fc-theme-standard .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-top: 1px solid #f4f4f4;
    border-left: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }
  .fc-theme-standard td.fc-daygrid-day {
    border-bottom: none;
  }
  .fc-scrollgrid.fc-scrollgrid-liquid {
    border-radius: 12px;
    padding: 20px;
  }

  .fc-theme-standard th.fc-col-header-cell:last-child {
    border-right: none;
  }
  .fc-col-header-cell {
    padding: 12px 0 !important;
  }
  .fc .fc-button-group {
    gap: 10px;
  }
  .fc .fc-button-primary {
    background: #fff;
    border: 1px solid #f4f4f4;
    color: #636363;
  }
  .fc-daygrid-day-frame.fc-scrollgrid-sync-inner {
    padding: 5px 14px;
  }
  .fc-header-toolbar {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

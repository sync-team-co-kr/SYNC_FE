import styled from 'styled-components';
import { vars } from 'token';

export const TaskItemComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  gap: 8px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${vars.sementic.color.black10};
  background-color: ${vars.sementic.color.white};
`;

export const TaskItemHeader = styled.div`
  display: flex;
  gap: 9px;
`;

export const TaskItemContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const TaskItemContentImageContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TaskItemContentText = styled.div`
  display: flex;
  flex-direction: column;
`;

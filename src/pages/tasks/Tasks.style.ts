import { styled } from 'styled-components';

// ------------------- index.tsx ------------------------------------
export const TaskBoardContainer = styled.section`
  padding: 0 0 0 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TaskBoardHeader = styled.section`
  margin-bottom: 20px;
`;

// ------------------- Tasks.Board.tsx ------------------------------------

export const StyledTaskBoardList = styled.ul`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

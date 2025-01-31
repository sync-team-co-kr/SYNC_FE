import { styled } from 'styled-components';
import { vars } from 'token';

export const ProjectBoardContainer = styled.li`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${vars.sementic.color.black10};
  background: ${vars.sementic.color.white};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 16px;

  /* width: 100%; */
  overflow: hidden;
  box-sizing: border-box;
  text-overflow: ellipsis;
`;

export const ProjectBoardHeader = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const MeatBallsWrap = styled.section`
  width: 28px;
  height: 28px;
  cursor: pointer;
  position: absolute;
`;

export const ProjectBoardTitle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  gap: 2px;
  h2 {
    ${vars.sementic.typography['heading-4']};
    color: ${vars.sementic.color.black};
  }
  h5 {
    ${vars.sementic.typography['small-text-b']};
    color: ${vars.sementic.color.black35};
  }
`;

export const DescriptionFrame = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* -webkit- 접두사는 크로스브라우징을 위해 추가 */
  -webkit-line-clamp: 2; /* 보여질 줄 수  */
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

export const ProjectBoardFooter = styled.section`
  padding: 0 1px;
  display: flex;
  justify-content: space-between;
  align-items: conter;
`;

export const ProjectBoardMembers = styled.ul`
  display: flex;
  flex-direction: row;
  gap: -2px;
`;

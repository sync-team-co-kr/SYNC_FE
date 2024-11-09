import { styled } from 'styled-components';
import { vars } from 'token';

export const ProjectNavigatorDropdown = styled.ul<{ $isopen: boolean }>`
  width: 300px;
  padding: 12px 0;
  background-color: ${vars.sementic.color.white};
  border: 1px solid ${vars.sementic.color.black10};
  border-radius: 12px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);

  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  position: absolute;
  top: 100%;
  z-index: 50;
`;

export const NavigationItem = styled.li`
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  & div:first-child {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: ${vars.sementic.typography['heading-3']};
    }
  }
  & div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    & span:first-child {
      font-size: ${vars.sementic.typography['heading-4']};
      font-weight: 700;
    }
    & span:last-child {
      color: ${vars.sementic.color.black35};
      font-size: ${vars.sementic.typography['small-text-b']};
      font-weight: 700;
    }
  }
  &:hover {
    background-color: ${vars.sementic.color.black20};
  }
`;

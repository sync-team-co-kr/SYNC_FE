import { styled } from 'styled-components';
import { vars } from 'token';

export const CalendarDropdownWrapper = styled.section<{ $isopen: boolean }>`
  padding: 10px 32px;
  background-color: ${vars.sementic.color.white};
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  gap: 30px;
  position: absolute;
  bottom: -128px;
  z-index: 50;
`;

export const HourPicker = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  li {
    cursor: pointer;
  }
`;

export const PickerElement = styled.li<{ $hasCurrent: boolean }>`
  color: ${(props) =>
    props.$hasCurrent
      ? vars.sementic.color.black
      : vars.sementic.color.black20};
`;

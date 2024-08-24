import { styled } from 'styled-components';
import { vars } from 'token';

export const SInputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    color: var(--Black-White-Black-35, #8f8f8f);
    font-size: ${vars.sementic.typography['small-text-b'].fontSize};
    font-weight: ${vars.sementic.typography['small-text-b'].fontWeight};
  }
  input {
    padding: 12px 8px;
    border: 1px solid var(--Black-White-Black-20, #bfbfbf);
    border-radius: 4px;
    color: var(--Black-White-Black-70, #636363);
    font-size: ${vars.sementic.typography.paragraph.fontSize};
    font-weight: ${vars.sementic.typography.paragraph.fontWeight};
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const InputWithCoverIcon = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  gap: 8px;
  input {
    flex-grow: 1;
  }
`;

export const SInputWithCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  input {
    width: 100%;
    padding-right: 42px;
  }
`;

export const CalendarSVG = styled.div`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 21px;
`;

export const CalendarDropdownActiveButton = styled.div`
  position: relative;
`;

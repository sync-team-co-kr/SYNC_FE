import { styled } from 'styled-components';
import { vars } from 'token';

const ToggleContainer = styled.div<{ $isactive: boolean }>`
  width: 30px;
  padding: 2px;
  background-color: ${(props) =>
    props.$isactive
      ? vars.sementic.color.primaryOrange
      : vars.sementic.color.black20};
  border-radius: 30px;
  display: flex;
  justify-content: ${(props) => (props.$isactive ? 'flex-end' : 'flex-start')};
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 12px;
`;

interface ToggleProps {
  isActive: boolean;
  toggleSwtich: () => void;
}

const Toggle = ({ isActive, toggleSwtich }: ToggleProps) => {
  console.log(isActive);
  return (
    <ToggleContainer onClick={toggleSwtich} $isactive={isActive}>
      <ToggleSwitch></ToggleSwitch>
    </ToggleContainer>
  );
};

export default Toggle;

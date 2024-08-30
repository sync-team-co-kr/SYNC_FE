import { ToggleContainer, ToggleSwitch } from './Toggle.style';
import { ToggleProps } from './Toggle.types';

const Toggle = ({ isActive, toggleSwtich }: ToggleProps) => {
  console.log(isActive);
  return (
    <ToggleContainer onClick={toggleSwtich} $isactive={isActive}>
      <ToggleSwitch></ToggleSwitch>
    </ToggleContainer>
  );
};

export default Toggle;

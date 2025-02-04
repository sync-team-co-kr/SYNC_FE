import { styled } from 'styled-components';
import { vars } from 'token';

interface LabelProps {
  text: string;
  id: string;
  isRequired: boolean;
}

const LabelWrapper = styled.label<{ $isrequired: boolean }>`
  ${vars.sementic.typography['small-text-b']};
  color: ${vars.sementic.color.black70};
  &::before {
    display: ${(props) => (props.$isrequired ? 'inline-block' : 'none')};
    content: '*';
    margin-right: 5px;
    color: ${vars.sementic.color.negativeRed};
  }
`;

const Label = ({ text, id, isRequired }: LabelProps) => {
  return (
    <LabelWrapper htmlFor={id} $isrequired={isRequired}>
      {text}
    </LabelWrapper>
  );
};

export default Label;

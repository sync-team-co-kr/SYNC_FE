import React from 'react';

import { styled } from 'styled-components';
import { vars } from 'token';

const SettingsItem = styled.li`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 6px;
  gap: 8px;
  align-self: stretch;
  svg {
    width: 18px;
    height: 18px;
  }
  span {
    color: ${vars.sementic.color.black};
    font-size: ${vars.sementic.typography.paragraph.fontSize};
  }
`;

interface DropdownItemProps {
  text: string;
  Icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const DropdownItem = ({ text, Icon, onClick }: DropdownItemProps) => {
  return (
    <SettingsItem onClick={onClick}>
      {Icon && <Icon />}
      <span>{text}</span>
    </SettingsItem>
  );
};

export default DropdownItem;

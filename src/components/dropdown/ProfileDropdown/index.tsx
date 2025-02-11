import { useEffect } from 'react';

interface TempProfileDropdownProps {
  selectIconValue: string;
  selectIconOnClick: (icon: string) => void;
}

const ProfileDropdown = ({
  selectIconValue,
  selectIconOnClick,
}: TempProfileDropdownProps) => {
  useEffect(() => {
    console.log(selectIconValue, selectIconOnClick);
  }, []);
  return <></>;
};

export default ProfileDropdown;

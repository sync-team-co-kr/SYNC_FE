interface TempProfileDropdownProps {
  selectIconValue: string;
  selectIconOnClick: (icon: string) => void;
}

const ProfileDropdown = ({
  selectIconValue,
  selectIconOnClick,
}: TempProfileDropdownProps) => {
  console.log(selectIconValue, selectIconOnClick);
  return <></>;
};

export default ProfileDropdown;

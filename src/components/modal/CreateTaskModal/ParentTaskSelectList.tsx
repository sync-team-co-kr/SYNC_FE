import ParentTaskSelectDropdown from './ParentTaskSelectDropdown';
import { SectionContainer } from './style';

interface ParentTaskSelectListProps {
  parentTaskId?: number;
}

const ParentTaskSelectList = ({ parentTaskId }: ParentTaskSelectListProps) => {
  if (parentTaskId === 1 || parentTaskId === 2)
    return (
      <SectionContainer maxWidth="100%" direction="row" gap={24}>
        <ParentTaskSelectDropdown parentTaskName="테스크" />;
      </SectionContainer>
    );
  else if (parentTaskId === 2)
    return (
      <SectionContainer maxWidth="100%" direction="row" gap={24}>
        <ParentTaskSelectDropdown parentTaskName="서브 테스크" />;
      </SectionContainer>
    );
  return <></>;
};

export default ParentTaskSelectList;

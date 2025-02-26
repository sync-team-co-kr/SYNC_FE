import ParentTaskSelectDropdown from './ParentTaskSelectDropdown';
import { SectionContainer } from './style';

interface ParentTaskSelectListProps {
  selectedDepth: number;
}

const ParentTaskSelectList = ({ selectedDepth }: ParentTaskSelectListProps) => {
  if (selectedDepth >= 2)
    return (
      <>
        <SectionContainer $maxWidth="100%" direction="row" $gap={24}>
          <ParentTaskSelectDropdown taskDepthName="테스크" />
        </SectionContainer>
        <SectionContainer $maxWidth="100%" direction="row" $gap={24}>
          <ParentTaskSelectDropdown taskDepthName="서브 테스크" />
        </SectionContainer>
      </>
    );
  if (selectedDepth >= 1)
    return (
      <SectionContainer $maxWidth="100%" direction="row" $gap={24}>
        <ParentTaskSelectDropdown taskDepthName="테스크" />
      </SectionContainer>
    );

  return <></>;
};

export default ParentTaskSelectList;

// parenttaskid 0 테스크 1 서브 테스크 2 테스크,

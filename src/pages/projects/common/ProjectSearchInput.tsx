import Textfield from '@components/common/Textfield';
import { RawProject } from '@customTypes/project';

type ProjectSearchInputType = {
  projectListData: RawProject[];
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
};

const ProjectSearchInput = ({
  projectListData,
  searchQuery,
  updateSearchQuery,
}: ProjectSearchInputType) => (
  <>
    <Textfield
      disabled={projectListData.length === 0 || !projectListData}
      variant="search"
      helperText="검색어를 입력하세요"
      placeholder="검색"
      type="search"
      width="198px"
      value={searchQuery}
      onChange={(e) => updateSearchQuery(e.target.value)}
    />
  </>
);

export default ProjectSearchInput;

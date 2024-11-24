import Textfield from '@components/common/Textfield';
import { RawProject } from '@customTypes/project';

type ProjectSearchInputType = {
  searchQuery: string;
  projectData: RawProject[];
  searchFilteredProjects: (query: string) => void;
};

const ProjectSearchInput = ({
  searchQuery,
  projectData,
  searchFilteredProjects,
}: ProjectSearchInputType) => (
  <>
    <Textfield
      disabled={projectData.length === 0 || !projectData}
      variant="search"
      helperText="검색어를 입력하세요"
      placeholder="검색"
      type="search"
      width="198px"
      value={searchQuery}
      onChange={(e) => searchFilteredProjects(e.target.value)}
    />
  </>
);

export default ProjectSearchInput;

import Textfield from '@components/common/Textfield';

type ProjectSearchInputType = {
  searchQuery: string;
  searchFilteredProjects: (query: string) => void;
};

const ProjectSearchInput = ({
  searchQuery,
  searchFilteredProjects,
}: ProjectSearchInputType) => (
  <>
    <Textfield
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

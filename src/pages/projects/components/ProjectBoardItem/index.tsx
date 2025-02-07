import { ReactComponent as MeatBalls } from '@assets/meatballs.svg';
import ProgressBarGraph from '@components/ProgressBarGraph';
import Thumbnail from '@components/Thumbnail/Thumbnail';
import { DayTag } from '@components/common/DayTag';
import { RawProject } from '@customTypes/project';
import useDropdown from '@hooks/useDropdown';
import ProjectSettingsDropdown from '@pages/projects/components/ProjectSettingsDropdown/ProjectSettingsDropdown';

// import { useGetTasks } from '@services/task';
import ProjectMemberAvatar from './ProjectMemberAvatar';
import {
  DescriptionFrame,
  MeatBallsWrap,
  ProjectBoardContainer,
  ProjectBoardFooter,
  ProjectBoardHeader,
  ProjectBoardMembers,
  ProjectBoardTitle,
} from './styles';

const ProjectBoardItem = ({ project }: { project: RawProject }) => {
  const [
    isOpenProjectDropdownMenu,
    toggleProjectDropdownMenu,
    projectDropdownMenuRef,
  ] = useDropdown();

  return (
    <ProjectBoardContainer key={project.projectId}>
      <ProjectBoardHeader>
        <Thumbnail
          thumbnail={project.thumbnail}
          thumbnailType={project.thumbnailType}
        />
        <ProjectBoardTitle>
          <h5>{project.subTitle}</h5>
          <h2>{project.title}</h2>
        </ProjectBoardTitle>
        <MeatBallsWrap ref={projectDropdownMenuRef}>
          <MeatBalls onClick={toggleProjectDropdownMenu} />
          <ProjectSettingsDropdown
            isOpen={isOpenProjectDropdownMenu}
            closeDropdown={toggleProjectDropdownMenu}
            projectId={project.projectId}
          />
        </MeatBallsWrap>
      </ProjectBoardHeader>

      <DescriptionFrame>{project.description}</DescriptionFrame>

      <ProgressBarGraph
        totalCount={project.task?.totalCount}
        completedCount={project.task?.completedCount}
      />

      <ProjectBoardFooter>
        <ProjectBoardMembers>
          {project.members.map((member) => (
            <ProjectMemberAvatar
              key={member.id}
              username={member.username || ''}
            />
          ))}
        </ProjectBoardMembers>
        <DayTag
          date={{
            start: new Date(project.startDate!),
            end: new Date(project.endDate!),
          }}
          variant="period"
        />
      </ProjectBoardFooter>
    </ProjectBoardContainer>
  );
};

export default ProjectBoardItem;

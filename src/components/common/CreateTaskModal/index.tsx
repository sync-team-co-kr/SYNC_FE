// 업무 생성 모달 내 form
import { ReactComponent as CloseX } from '@assets/cancel-x.svg';
import { Button } from '@components/common/Button';
import { Select } from '@components/common/Select/Select';
import { Typography } from '@components/common/Typography';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { useGetProjectList } from '@services/project/Project.hooks';

import { Container, ContainerContent, ContainerHeader } from './style';

// 업무 생성 모달

export const CreateTaskModal = () => {
  const { closeModal } = modalStore();

  // const { resetPayload } = useTaskActions();
  const { payload, project } = useTaskState();

  const { setProject } = useTaskActions();

  const { projectListData } = useGetProjectList() ?? {};

  console.log(payload);

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="heading-3" color="black">
          업무 생성
        </Typography>
        <Button
          hasIcon
          renderIcon={<CloseX width={24} height={24} />}
          onClick={closeModal}
          size="small"
          variant="text"
        />
      </ContainerHeader>
      <ContainerContent>
        <Select
          label="프로젝트"
          value={
            project.title !== '' ? project.title : '프로젝트를 선택해 주세요'
          }
          setValue={setProject}
          options={projectListData ?? []}
          type="select"
          hasSearch
        />
      </ContainerContent>
    </Container>
  );
};

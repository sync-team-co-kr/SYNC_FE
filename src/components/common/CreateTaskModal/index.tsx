// 업무 생성 모달 내 form
import { ReactComponent as CloseX } from '@assets/cancel-x.svg';
import { Button } from '@components/common/Button';
import { Select } from '@components/common/Select/Select';
import { LabelContainer } from '@components/common/Select/style';
import { Typography } from '@components/common/Typography';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { useGetProjectList } from '@services/project/Project.hooks';

import {
  ButtonGroup,
  Container,
  ContainerContent,
  ContainerHeader,
  SectionContainer,
} from './style';

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
        {/* project name */}

        <SectionContainer>
          <Select
            label="프로젝트 명"
            listLabel="프로젝트"
            isEssential
            value={
              project.title !== '' ? project.title : '프로젝트를 선택해 주세요'
            }
            setValue={setProject}
            options={projectListData ?? []}
            type="select"
            hasSearch
          />
        </SectionContainer>
        {/* task state */}
        <SectionContainer>
          <LabelContainer>
            <Typography variant="small-text-b" color="negativeRed">
              *
            </Typography>
            <Typography variant="small-text-b" color="black35">
              업무 속성
            </Typography>
          </LabelContainer>
          <ButtonGroup>
            <Button
              size="small"
              variant="outline"
              text="테스크"
              onClick={() => {
                console.log('task');
              }}
            />
          </ButtonGroup>
        </SectionContainer>
      </ContainerContent>
    </Container>
  );
};

// 업무 생성 모달 내 form
import { ReactComponent as CloseX } from '@assets/cancel-x.svg';
import projectIcon from '@assets/project-icon.png';
import { Button } from '@components/common/Button';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import { SelectItem, SelectList } from '@components/common/Select/Select.list';
import { LabelContainer } from '@components/common/Select/style';
import { Tag } from '@components/common/Tag';
import { SituationProperty } from '@components/common/Tag/types';
import Textfield from '@components/common/Textfield';
import { Typography } from '@components/common/Typography';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { useCreateTask } from '@services/task/Task.hooks';

import { SELECT_STATUS } from './constants';
import {
  Container,
  ContainerContent,
  ContainerFooter,
  ContainerHeader,
  LeftContent,
  RightContent,
  SectionContainer,
  SideHeader,
  TitleHeader,
  UpperHeader,
} from './style';

// 업무 생성 모달

export const UpdateTaskModal = () => {
  const { closeModal } = modalStore();

  // 업무 생성 모달 payload 값들을 가져오는 state
  // const { resetPayload } = useTaskActions();
  const { payload, errorList } = useTaskState();

  // 업무 생성 모달 payload 값들을 set 해주는 actions
  const { setStatus } = useTaskActions();

  // projectData를 가져오는 hooks

  const { createTaskMutate } = useCreateTask();
  const handleCreateTask = () => {
    if (errorList.length > 0) {
      alert('필수 입력값을 입력해주세요');
      return;
    }
    createTaskMutate({
      data: payload,
    });
  };

  return (
    <Container>
      <ContainerHeader>
        <UpperHeader>
          <Typography variant="heading-5" color="black70">
            가상의 프로젝트 1 / 테스크
          </Typography>
          <SideHeader>
            <Button
              $hasIcon
              $renderIcon={<CloseX width={24} height={24} />}
              onClick={closeModal}
              size="small"
              variant="text"
            />
          </SideHeader>
        </UpperHeader>
        <TitleHeader>
          <img src={projectIcon} alt="프로젝트아이콘" />
          <Typography variant="heading-4" color="black">
            업무 명
          </Typography>
        </TitleHeader>
      </ContainerHeader>
      <ContainerContent>
        <LeftContent>
          {/* description */}
          <SectionContainer>
            <LabelContainer>
              <Typography variant="small-text-b" color="negativeRed">
                *
              </Typography>
              <Typography variant="small-text-b" color="black35">
                업무 생성
              </Typography>
            </LabelContainer>
            <Textfield
              variant="outlined"
              placeholder="설명을 입력해주세요"
              value={payload.description}
              onChange={(e) => console.log(e.target.value)}
            />
          </SectionContainer>
          {/* description end */}
          {/* comment */}
          <SectionContainer>
            <LabelContainer>
              <Typography variant="small-text-b" color="negativeRed">
                *
              </Typography>
              <Typography variant="small-text-b" color="black35">
                Label
              </Typography>
            </LabelContainer>
            <Textfield
              variant="outlined"
              placeholder="설명을 입력해주세요"
              value={payload.description}
              onChange={(e) => console.log(e.target.value)}
            />
          </SectionContainer>
          {/* comment end */}
        </LeftContent>
        <RightContent>
          {/*  status */}
          <SectionContainer>
            <Typography variant="heading-4" color="black">
              세부사항
            </Typography>
            <LabelContainer>
              <Typography variant="small-text-b" color="black35">
                상태
              </Typography>
            </LabelContainer>
            <Select
              listLabel="상태"
              value={
                <Tag
                  type="situation"
                  property={
                    SELECT_STATUS[payload.status].value as SituationProperty
                  }
                />
              }
              type="select"
            >
              <SelectList>
                {Object.values(SELECT_STATUS).map((status) => (
                  <SelectItem
                    key={status.value}
                    onClick={() => setStatus(status.id)}
                  >
                    <Tag type="situation" property={status.value} />
                  </SelectItem>
                ))}
              </SelectList>
              <SelectButton />
            </Select>
          </SectionContainer>
          {/* status end */}
          {/* owner */}
          <SectionContainer>
            <LabelContainer>
              <Typography variant="small-text-b" color="black35">
                담당자
              </Typography>
            </LabelContainer>
            {/* owner 추가되어야 함 */}
            <Select listLabel="담당자" value={'담당자'} type="select">
              <SelectButton />
              {/* @TODO owner 추가시 list 뿌려주기 */}
            </Select>
          </SectionContainer>
          {/* date */}
          <SectionContainer>
            <LabelContainer>
              <Typography variant="small-text-b" color="black35">
                일정
              </Typography>
            </LabelContainer>
            <SectionContainer direction="row" gap={24}>
              <Textfield
                variant="outlined"
                placeholder="날짜"
                value={''}
                onChange={(e) => console.log(e.target.value)}
              />
              <Textfield
                variant="outlined"
                placeholder="날짜"
                value={''}
                onChange={(e) => console.log(e.target.value)}
              />
            </SectionContainer>
            <SectionContainer direction="row" gap={24}>
              <Textfield
                variant="outlined"
                placeholder="시간"
                value={''}
                onChange={(e) => console.log(e.target.value)}
              />
              <Textfield
                variant="outlined"
                placeholder="시간"
                value={''}
                onChange={(e) => console.log(e.target.value)}
              />
            </SectionContainer>
          </SectionContainer>
          {/* date end */}
        </RightContent>
      </ContainerContent>
      <ContainerFooter>
        <Button variant="text" size="medium" text="취소" onClick={closeModal} />
        <Button
          variant="fill"
          size="medium"
          text="완료"
          onClick={handleCreateTask}
        />
      </ContainerFooter>
    </Container>
  );
};

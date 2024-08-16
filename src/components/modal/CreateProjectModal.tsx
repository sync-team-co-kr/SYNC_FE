import React, { useState } from 'react';

import CalendarIcon from '@assets/calendar.svg';
import CancelButton from '@assets/cancel-x.svg';
// import ProjectProfile from '@assets/project-profile.png';
import Textfield from '@components/common/Textfield';
import CalendarDropdown from '@components/dropdown/CalendarDropdown';
import useDropdown from '@hooks/useDropdown';
import { setIsModalOpen } from '@hooks/useModal';
import useProjectList from '@hooks/useProjectList';
import { format } from 'date-fns';
import styled from 'styled-components';

const CreateProjectModalHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  h1 {
    color: var(--main-black, #000);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  button {
    background-color: transparent;
    border: none;
  }
`;

const Form = styled.form`
  width: 472px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    color: var(--Black-White-Black-35, #8f8f8f);
    /* Small Text_B */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px; /* 116.667% */
  }
  input {
    padding: 12px 8px;
    border: 1px solid var(--Black-White-Black-20, #bfbfbf);
    border-radius: 4px;
    color: var(--Black-White-Black-70, #636363);
    /* Paragraph */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

// const InputWithCover = styled.div`
//   height: 44px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   input {
//     flex-grow: 1;
//   }
// `;

const LabelWithToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  div {
    font-size: 12px;
  }
`;

const InputWithProjectPeriod = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  label {
    flex-grow: 1;
  }
`;

const InputCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  input {
    width: 100%;
    padding-right: 42px;
  }
`;

const CalendarImgDiv = styled.div`
  position: absolute;
  right: 21px;
`;

const CalendarDropdownActiveButton = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  img {
    width: 18px;
    height: 18px;
  }
`;

const Submit = styled.div`
  padding: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  * {
    height: 42px;
    padding: 8px 24px;
    background: var(--Black-White-White, #fff);

    color: var(--Black-White-Black-70, #636363);
    /* Heading 5 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px; /* 121.429% */

    border: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  input[type='submit'] {
    background: var(--Primary-Orange-Yellow-Orange, #ffd880);
  }
`;

/** 추후 swagger에 정의된 타입으로 변경 */
export interface ICreateProjectRequest {
  title: string;
  subTitle: string;
  description: string;
}

export interface IProject {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[];
}

function CreateProjectModal({ closeModal }: { closeModal?: setIsModalOpen }) {
  const [newProject, setNewProject] = useState<ICreateProjectRequest>({
    title: '',
    subTitle: '',
    description: '',
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isOpenCalendarDropdown, toggleCalendarDropdown, calendarDropdownRef] =
    useDropdown();
  const [
    isOpenCalendarDropdown2,
    toggleCalendarDropdown2,
    calendarDropdownRef2,
  ] = useDropdown();
  const { createProjectMutation } = useProjectList();

  const handleCreateProject = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    createProjectMutation.mutate({
      ...newProject,
      startDate,
      endDate,
    });
  };

  return (
    <>
      <CreateProjectModalHeader>
        <h1>프로젝트 추가</h1>
        <button>
          <img src={CancelButton} alt="닫기" />
        </button>
      </CreateProjectModalHeader>

      <Form>
        <Textfield
          initialValue
          label="커버 & 프로젝트 명"
          placeholder="제목"
          helperText="제목을 입력 해주세요"
          hasIcon={true}
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          variant="outlined"
        />
        {/* <InputContainer>
          <label>커버 & 프로젝트 명</label>
          <InputWithCover>
            <img src={ProjectProfile} alt="프로젝트 프로필" />
            <input
              type="text"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              placeholder="제목"
            />
          </InputWithCover>
        </InputContainer> */}

        <Textfield
          label="부제목"
          placeholder="부제목"
          helperText="부제목을 입력 해주세요"
          value={newProject.subTitle}
          onChange={(e) =>
            setNewProject({ ...newProject, subTitle: e.target.value })
          }
          variant="outlined"
        />
        {/* <InputContainer>
          <label>부제목</label>
          <input
            type="text"
            value={newProject.subTitle}
            onChange={(e) =>
              setNewProject({ ...newProject, subTitle: e.target.value })
            }
            placeholder="부제목"
          />
        </InputContainer> */}

        <Textfield
          label="설명"
          placeholder="설명"
          helperText="설명을 입력 해주세요"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          variant="outlined"
        />

        <InputContainer>
          <LabelWithToggle>
            <label>일정</label>
            <div>
              <span></span>
              <div>토글</div>
            </div>
          </LabelWithToggle>

          <InputWithProjectPeriod>
            <InputCalendar>
              <input
                type="text"
                value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                placeholder="프로젝트 시작일"
                readOnly
              ></input>
              <CalendarImgDiv>
                <CalendarDropdownActiveButton ref={calendarDropdownRef}>
                  <img
                    src={CalendarIcon}
                    alt="달력 아이콘"
                    onClick={toggleCalendarDropdown}
                  />
                  <CalendarDropdown
                    isOpen={isOpenCalendarDropdown}
                    setDate={setStartDate}
                  />
                </CalendarDropdownActiveButton>
              </CalendarImgDiv>
            </InputCalendar>

            <div></div>
            <InputCalendar>
              <input
                type="text"
                value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                placeholder="프로젝트 종료일"
                readOnly
              ></input>
              <CalendarImgDiv>
                <CalendarDropdownActiveButton ref={calendarDropdownRef2}>
                  <img
                    src={CalendarIcon}
                    alt="달력 아이콘"
                    onClick={toggleCalendarDropdown2}
                  />
                  <CalendarDropdown
                    isOpen={isOpenCalendarDropdown2}
                    setDate={setEndDate}
                  />
                </CalendarDropdownActiveButton>
              </CalendarImgDiv>
            </InputCalendar>
          </InputWithProjectPeriod>
        </InputContainer>

        <Submit>
          <button onClick={closeModal}>취소</button>
          <input type="submit" value="추가하기" onClick={handleCreateProject} />
        </Submit>
      </Form>
    </>
  );
}

export default CreateProjectModal;

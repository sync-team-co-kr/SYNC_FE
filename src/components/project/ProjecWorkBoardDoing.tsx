import styled from 'styled-components';
import { Typography } from '@components/common/Typography';
import {ReactComponent as WorkboxIcon} from '@assets/projects/workbox.svg'
import {ReactComponent as CreateIcon} from '@assets/projects/create.svg'
import { useState } from 'react';
import { Button } from '@components/common/Button';
import { vars } from 'token';
import ProjectCreateWorkBoard from './ProjectCreateWorkBoard';


const ProjectWorkBoard = styled.li`
  width: 414px;
  min-height: 100px;
  border-radius: 12px;
  border: 1px solid ${vars.sementic.color.black10}; 
  background: ${vars.sementic.color.lightBlue};
  display: flex;
  display: flex;
  flex-direction: column;
`;

const ProjectWorkBoardHeader = styled.section`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 8px;
`;

const ProjectWorkBoardTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  gap: 8px;
`;

const TitleDetail = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  gap:4px;
`;

const ProjectFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap:8px;
  padding: 8px;
`;

const ProjectCreatWork = styled.button`
  display: flex;
  justify-content: baseline;
  align-items: center;
  height: 34px;
  color: var(--Black-White-Black-100, #202020);
  background-color: #ffffff;
  border-radius: 8px;
  border: none;
  margin: 0 8px 8px 8px;
  padding:0;
  cursor: pointer; 
`;

const Icon = styled.div`
 margin: 0 8px 0 8px;
`;





const ProjectWorkBoardToDo = () => {
  const [isClicked , setIsClick] = useState(false)

  const handleClick = (value: boolean) => {
    setIsClick(value);
  };

  return(
    <ProjectWorkBoard>
      <ProjectWorkBoardHeader>
        <ProjectWorkBoardTitle>
          <Typography variant="heading-5" color="positiveBlue">하는 중</Typography>
          <TitleDetail>
          <WorkboxIcon stroke={vars.sementic.color.positiveBlue}/>
            <Typography variant="heading-4" color="positiveBlue">0</Typography>
          </TitleDetail>
          </ProjectWorkBoardTitle>
      </ProjectWorkBoardHeader>
      {isClicked ?
      <>
        <ProjectCreateWorkBoard/>
        <ProjectFooter>
          <Button
          size='small'
          variant='text'
          hasIcon={false}
          isDisabled={false}
          iconPosition={undefined}
          onClick={()=>handleClick(false)}
          text="취소"
          />
        <Button
          size='small'
          variant='fill'
          hasIcon={false}
          isDisabled={false}
          iconPosition={undefined}
          onClick={()=>handleClick(false)}
          text="확인"
          />
        </ProjectFooter>
      </>
      :
      <ProjectCreatWork onClick={()=>handleClick(true)}>
        <Icon>
          <CreateIcon stroke={vars.sementic.color.black70}/>
        </Icon>
        <Typography variant="heading-5" color="black70">업무 생성</Typography>
      </ProjectCreatWork>
      }
    </ProjectWorkBoard>
  )
};

export default ProjectWorkBoardToDo;

/*
  
  interface Member {
    profileImg: string;
    userId: string;
    username: string;
  }

  interface APIResponse {
    value: Member;
  }

  const MemberProfile = ({ memberId }: { memberId: number }) => {
  const [member, setMember] = useState<Member | null>(null);
  const fetchMemberDetail = async (userId: number) => {
    const response: AxiosResponse<APIResponse, any> =
      await requiredJwtTokeninstance.get(`/api/user/info`, {
        params: {
          userId,
        },
      });
    return response;
  };

  useEffect(() => {
    fetchMemberDetail(memberId).then((res) => setMember(res.data.value));
  }, []);

  return <li>{member?.username.slice(-2)}</li>;
};


  project.memberIds.map((memberId) => (
    <MemberProfile key={project.projectId} memberId={memberId} />
  ))
*/

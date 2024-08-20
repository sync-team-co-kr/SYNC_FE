import styled from 'styled-components';
import { Typography } from '@components/common/Typography';
import { vars } from 'token';
import React from 'react';
import createworkBoardimg from '@assets/projects/createworkboard.png'


const ProjectWorkBoard = styled.li`
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 8px 0 8px;
`;

const ProjectWorkBoardHeader = styled.section`
  display: flex;
  justify-content: space-between;
`;

const ProjectWorkBoardTitle = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin: 5px 0 5px 0;
`;

const TitleDetail = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-grow: 1;
  gap:4px;
`;

const ProjectInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid var(--Black-White-Black-10, #f4f4f4);
  background: #ffffff;
`;

const Title= styled.div`
  display: flex;
  align-items: center;
  width:100%;
  gap: 12px;
  border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4);
  img {
    padding-left: 12px;
  }
`;

const InputTitle = styled.input`
  height: 40px;
  width: 100%;
//     /* Heading 5 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  border: none;
  border-radius: 12px;
  border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4);
  gap: 8px;
  &:focus {
    outline: none; 
    border-bottom: none;
  }
  &::placeholder {
    color: var(--Black-White-Black-35, #b3b3b3);
  }
`;


const Inputcontents = styled.input`
  height: 64px;
  width: 100%;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-indent: 12px;
  border-radius: 12px;
  border: none;
  border-bottom: 1px solid ${vars.sementic.color.black10};
  gap: 8px;
    &:focus {
    outline: none; 
    border-bottom: none;
  }
    &::placeholder {
      color: var(--Black-White-Black-35, #b3b3b3);
  }
`;



const ProjectCreateWorkBoard=() => {
  return(
    <ProjectWorkBoard>
      <ProjectWorkBoardHeader>
        <ProjectWorkBoardTitle>
          <Typography variant="small-text-b" color="black35">업무 생성</Typography>
          <TitleDetail>
            <Typography variant="small-text" color="black35">텍스트 자동 요약</Typography>
            <Typography variant="small-text" color="black35">토글</Typography>
          </TitleDetail>
        </ProjectWorkBoardTitle>
      </ProjectWorkBoardHeader>
      <ProjectInput>
        <Title>
          <img src={createworkBoardimg}/>
          <InputTitle type='text' placeholder='제목을 입력해주세요.'/>
        </Title>
        <Inputcontents type='text' placeholder='내용을 입력해주세요.'/>
      </ProjectInput>
    </ProjectWorkBoard>
  )
};


export default ProjectCreateWorkBoard;

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

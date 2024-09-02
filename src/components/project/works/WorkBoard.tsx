import styled from 'styled-components';
import workboardimg from'@assets/projects/workboard-image.png'
import Dday from '@assets/projects/d-day-img.png'
import bargraph from '@assets/projects/BarGrahph-img.png'
import meatballs from '@assets/meatballs.svg';
import WorkBoardDropdownMenu from '@components/dropdown/WorkBoardDropdownMenu';
import {ReactComponent as WorkboxIcon} from '@assets/projects/workbox.svg'
import { vars } from 'token';
import { Typography } from '@components/common/Typography';
import useDropdown from '@hooks/useDropdown';


// interface Work {
//   workId: number;
//   title: string;
//   description: string;
//   startDate: Date;
//   endDate: Date;
//   memberIds: number[];
// }

const ProjectBoard = styled.li`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--Black-White-Black-10, #f4f4f4);
  background: var(--Black-White-White, #fff);
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px;
`;

const MeatBalls = styled.div`
 cursor: pointer;
  position: relative;
  display: none;
`;

const ProjectBoardHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover ${MeatBalls} {
    display: block;
  }
`;

const Header = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  img {
    width: 24px;
    height: 24px;
  }
`;

const ProjectBoardDescription = styled.p`
  height: auto;
`;

const BarGraph = styled.div`
  height: auto;
`;

const ProjectBoardFooter = styled.section`
  padding: 0 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectBoardMemberList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: -2px;
  li {
    width: 36px;
    height: 36px;
    padding: 5px 1px;
    background: var(--Alert-Color-Light-Blue, #e7f1ff);
    border: 2px solid var(--Black-White-White, #fff);
    border-radius: 999px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProjectBoardPeriod = styled.div`
  background-color: ${vars.sementic.color.black10};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SubTask = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  border-radius: 8px;
  border: none;
  color: ${vars.sementic.color.black70};;
  background: ${vars.sementic.color.black10};
`;

// const MeatBalls = styled.div`
//   cursor: pointer;
//   position: relative;
// `;


const Icon = styled.div`
 margin: 0 8px 0 8px;
`;



const WorkBoard= () => {
  const [
    isOpenProjectDropdownMenu,
    toggleProjectDropdownMenu,
    projectDropdownMenuRef,
  ] = useDropdown();

  return (
    <ProjectBoard>
      <ProjectBoardHeader>
        <Header>
          <img src={workboardimg}/>
          <Typography variant="heading-4" color="black">업무제목</Typography>
        </Header>
        <MeatBalls ref={projectDropdownMenuRef}>
          <img
            src={meatballs}
            alt="보드 더보기"
            onClick={toggleProjectDropdownMenu}
          />
          <WorkBoardDropdownMenu
            isOpen={isOpenProjectDropdownMenu}
          />
        </MeatBalls>
      </ProjectBoardHeader>
      <ProjectBoardDescription>
        <Typography variant="paragraph" color="black">요약내용</Typography>
      </ProjectBoardDescription>
      <BarGraph>
        <img src={bargraph}/> 
      </BarGraph>
      <ProjectBoardFooter>
        <ProjectBoardMemberList></ProjectBoardMemberList>
        <ProjectBoardPeriod>
          <img src={Dday}/>
        </ProjectBoardPeriod>
      </ProjectBoardFooter>
      <SubTask>
        <Icon>
          <WorkboxIcon stroke={vars.sementic.color.black70}/>
        </Icon>
        <Typography variant="heading-5" color="black70">하위업무</Typography>
      </SubTask>
    </ProjectBoard>
  );
};

export default WorkBoard;

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

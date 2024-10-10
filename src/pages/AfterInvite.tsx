import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Cookies from 'universal-cookie';

const AfterInvite = () => {
  const { invitecode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies(null, { path: '/' });
    cookies.set('invite-code', invitecode);
    navigate('/login');
  }, [invitecode]);
  return <div>초대 코드 확인 중</div>;
};

export default AfterInvite;

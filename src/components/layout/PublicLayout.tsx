import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

import { useLoggedInUserStore } from '@libs/store';
import { getLoggedUserAPI } from '@services/api';

const PublicLayout = () => {
  const [failedAuth, setFailedAuth] = useState(false);
  const { setLoggedInUser } = useLoggedInUserStore();

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const response = await getLoggedUserAPI();
        const profile = response.result;

        const cookies = new Cookies(null, { path: '/' });
        cookies.set('loggedInUser', profile, {
          maxAge: 1000 * 60 * 30,
        });
        return profile || null;
      } catch (error) {
        setFailedAuth(true);
        return null;
      }
    };
    getLoggedUser().then((profile) => setLoggedInUser(profile));
  }, []);

  if (failedAuth) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PublicLayout;

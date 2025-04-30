import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

import { useLoggedInUserStore } from '@libs/store';
import { getLoggedUserAPI } from '@services/api';
import { getUser } from '@services/member';
import CryptoJS from 'crypto-js';

const PublicLayout = () => {
  const [failedAuth, setFailedAuth] = useState(false);
  const { setLoggedInUser } = useLoggedInUserStore();

  const getLoggedUser = async () => {
    try {
      const cookies = new Cookies(null, { path: '/' });
      if (cookies.get('sync_uid')) {
        return null;
      }

      const response = await getLoggedUserAPI();
      const profile = response.result;
      const userInfoQuery = await getUser(profile.userId);

      const cryptoSecretKey = process.env.REACT_APP_CRYPTO_KEY || '';
      const encryptedUniqueId = CryptoJS.AES.encrypt(
        String(profile.userId),
        cryptoSecretKey,
      ).toString();
      const encryptedUserId = CryptoJS.AES.encrypt(
        userInfoQuery.userId,
        cryptoSecretKey,
      ).toString();

      cookies.set('sync_uid', encryptedUniqueId, {
        maxAge: 1800,
      });
      cookies.set('sync_user', encryptedUserId, {
        maxAge: 1800,
      });
      cookies.set('sync_unm', profile.username, {
        maxAge: 1800,
      });

      setLoggedInUser({
        uniqueId: encryptedUniqueId,
        userId: encryptedUserId,
        username: profile.username,
      });
      return null;
    } catch (error) {
      setFailedAuth(true);
      return null;
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  if (failedAuth) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PublicLayout;

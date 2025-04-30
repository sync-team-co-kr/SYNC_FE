import { Cookies } from 'react-cookie';

import CryptoJS from 'crypto-js';
import { create } from 'zustand';

interface IUser {
  uniqueId: number;
  userId: string;
  username: string;
}

interface SetLoggedInUserParams {
  uniqueId: string;
  userId: string;
  username: string;
}

interface LoggedInUserState {
  loggedInUser: IUser | null;
  setLoggedInUser: (userInfo: SetLoggedInUserParams) => void;
}

const cookies = new Cookies(null, { path: '/' });

const decryptUserInfo = (decryptTarget: string) => {
  const cryptoSecretKey = process.env.REACT_APP_CRYPTO_KEY || '';
  const decrypted = CryptoJS.AES.decrypt(
    decryptTarget,
    cryptoSecretKey,
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

const getLoggedInUser = () => {
  const { uniqueId, userId, username }: IUser = {
    uniqueId: cookies.get('sync_uid') || '',
    userId: cookies.get('sync_user') || '',
    username: cookies.get('sync_unm') || '',
  };
  console.log(username);
  const decrypedLoggedInUser = {
    uniqueId: Number(decryptUserInfo(String(uniqueId))),
    userId: decryptUserInfo(userId),
    username,
  };
  console.log(decrypedLoggedInUser.username);
  return decrypedLoggedInUser;
};

const useLoggedInUserStore = create<LoggedInUserState>((set) => ({
  loggedInUser: getLoggedInUser(),
  setLoggedInUser: ({ uniqueId, userId, username }) =>
    set(() => ({
      loggedInUser: {
        uniqueId: Number(decryptUserInfo(uniqueId)),
        userId: decryptUserInfo(userId),
        username,
      },
    })),
}));

export default useLoggedInUserStore;

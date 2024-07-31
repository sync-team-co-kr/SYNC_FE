import { Cookies } from 'react-cookie';

import { create } from 'zustand';

interface IUser {
  userId: string;
  username: string;
}

interface LoggedInUserState {
  loggedInUser: IUser | null;
  setLoggedInUser: (userInfo: IUser | null) => void;
}

const cookies = new Cookies(null, { path: '/' });

const useLoggedInUserStore = create<LoggedInUserState>((set) => ({
  loggedInUser: cookies.get('loggedInUser') || null,
  setLoggedInUser: (userInfo) => set(() => ({ loggedInUser: userInfo })),
}));

export default useLoggedInUserStore;

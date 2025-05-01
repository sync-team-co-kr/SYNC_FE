import { Cookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const cookies = new Cookies(null, { path: '/' });
  if (cookies.get('sync_uid')) return <Navigate to="/" />;
  return <Outlet />;
};

export default AuthLayout;

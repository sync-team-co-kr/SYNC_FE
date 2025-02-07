import LoginDevelopment from './LoginDevelopmentPage';
import LoginProduction from './LoginProductionPage';

export default function Login() {
  if (process.env.NODE_ENV === 'development') return <LoginDevelopment />;
  if (process.env.NODE_ENV === 'production') return <LoginProduction />;

  return <></>;
}

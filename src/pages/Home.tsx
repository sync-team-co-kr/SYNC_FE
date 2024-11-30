import { useToastActions } from '@libs/store/toast/toast';

function Home() {
  const { openToast } = useToastActions();
  return <button onClick={openToast}>토스트 작동기</button>;
}

export default Home;

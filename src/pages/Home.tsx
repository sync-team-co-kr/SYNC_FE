import TabMenu from '@components/TabMenu/TabMenu';

const test = [
  { route: '/', tabMenuName: '1번 메뉴' },
  { route: '/about', tabMenuName: '2번 메뉴' },
];

function Home() {
  return (
    <div>
      <TabMenu tabMenuList={test} />
    </div>
  );
}

export default Home;

export interface IMember {
  name: string;
  email: string;
  job: string;
  role: string;
}

const FAKE_MEMBER_LIST: IMember[] = [
  {
    name: '김지용',
    email: 'jiyong2523@gmail.com',
    job: '디자이너',
    role: '프로젝트 생성자',
  },
  {
    name: '최홍혁',
    email: 'hongh3916@gmail.com',
    job: '디자이너',
    role: '관리자',
  },
  {
    name: '이소정',
    email: 'sojong1602@gmail.com',
    job: '기획자',
    role: '팀원',
  },
  {
    name: '박승주',
    email: 'seungju8012@gmail.com',
    job: '개발자',
    role: '팀원',
  },
];

export default FAKE_MEMBER_LIST;

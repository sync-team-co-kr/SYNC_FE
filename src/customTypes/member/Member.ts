export default interface IMember {
  id: number;
  userId: string;
  username: string;
  nickname: string;
  position: string;
  isManager?: number;
}

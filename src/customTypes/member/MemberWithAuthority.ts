import IMember from './Member';

export default interface MemberWithAuthority extends IMember {
  isManager: 0 | 1 | 2;
}

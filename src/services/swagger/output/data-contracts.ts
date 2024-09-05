/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 업무를 수정하기 위한 DTO */
export interface UpdateTaskRequestDto {
  /** 업무 내용 */
  description?: string;
  /**
   * 업무 종료일
   * @format date-time
   */
  endDate?: string;
  /**
   * 업무 시작일
   * @format date-time
   */
  startDate?: string;
  /**
   * 업무 상태 ( 0: 진행중, 1: 완료, 2: 보류)
   * @format int32
   * @min 0
   * @max 2
   */
  status: number;
  /** 업무 이름 */
  title: string;
  /**
   * 수정할 업무의 프로젝트 아이디
   * @format int64
   */
  projectId: number;
  /**
   * 수정할 업무의 아이디
   * @format int64
   */
  taskId: number;
}

export interface SuccessResponse {
  message?: string;
  result?: boolean;
  data?: object;
}

export interface ModifyPwdRequestDto {
  /** @pattern (?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,16} */
  currentPwd: string;
  /** @pattern (?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,16} */
  newPwd: string;
  /** @pattern (?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,16} */
  checkNewPwd: string;
}

export interface UpdateProjectRequestDto {
  /** @format int64 */
  projectId: number;
  description: string;
  title: string;
  subTitle: string;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
}

/** 업무를 생성하기 위한 DTO */
export interface CreateTaskRequestDto {
  /** 업무 내용 */
  description?: string;
  /**
   * 업무 종료일
   * @format date-time
   */
  endDate?: string | Date;
  /**
   * 업무 시작일
   * @format date-time
   */
  startDate?: string | Date;
  /** 업무 이름 */
  title: string;
  /**
   * 상위 업무 아이디, null == 프로젝트 최상위 업무
   * @format int64
   */
  parentTaskId?: number | null;
  /**
   * 생성할 업무의 프로젝트 아이디
   * @format int64
   */
  projectId: number;
  /** 업무에 첨부할 이미지 파일들 */
  images?: File[];
}

/** 프로젝트를 생성하기 위한 DTO */
export interface CreateProjectRequestDto {
  /** 프로젝트 설명 */
  description: string;
  /** 프로젝트 이름 */
  title: string;
  /** 프로젝트 부제목 */
  subTitle: string;
  /**
   * 프로젝트 시작일
   * @format date-time
   */
  startDate: string;
  /**
   * 프로젝트 종료일
   * @format date-time
   */
  endDate: string;
}

/** 프로젝트 멤버에 업무를 할당하기 위한 DTO */
export interface MemberMappingToTaskRequestDto {
  /** 멤버 아이디, 멤버는 모두 같은 프로젝트 소속이어야 합니다. */
  memberIds: number[];
  /**
   * 업무 아이디
   * @format int64
   */
  taskId: number;
}

/** 멤버를 프로젝트에 생성하기 위한 DTO */
export interface MemberMappingToProjectRequestDto {
  /** 유저 로그인 아이디 */
  userIds: string[];
  /**
   * 프로젝트 아이디, 해당 프로젝트가 존재하는지 확인하세요
   * @format int64
   */
  projectId: number;
  /**
   * 해당 유저의 관리자 지정 여부, 0: 일반 유저, 1: 관리자, 2: 프로젝트 생성자
   * @format int32
   */
  isManager: number;
}

export interface ProjectInviteRequestDto {
  /** @format uuid */
  token?: string;
}

export interface SendLinkRequestDto {
  /** @format int64 */
  projectId?: number;
  title?: string;
  email?: string;
}

/** 회원가입 요청 DTO */
export interface SignupRequestDto {
  /** 사용자 이름 */
  username?: string;
  /** 사용자 닉네임 */
  nickname?: string;
  /**
   * 사용자 로그인 아이디
   * @minLength 5
   * @maxLength 30
   */
  userId: string;
  /**
   * 사용자 비밀번호
   * @pattern (?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,16}
   */
  password: string;
  /** 사용자 이메일 */
  email?: string;
}

/** 해당 업무를 삭제하기 위한 DTO */
export interface DeleteTaskRequestDto {
  /**
   * 업무 아이디
   * @format int64
   */
  taskId: number;
  /**
   * 삭제할 업무의 프로젝트 아이디
   * @format int64
   */
  projectId: number;
}

/** 프로젝트를 삭제하기 위한 DTO */
export interface DeleteProjectRequestDto {
  /**
   * 프로젝트 아이디
   * @format int64
   */
  projectId: number;
}

export type UpdateTaskData = SuccessResponse;

export type DeleteTaskData = SuccessResponse;

export type ModifyPwdData = SuccessResponse;

export type UpdateProjectData = SuccessResponse;

export type CreateProjectData = SuccessResponse;

export type DeleteProjectData = SuccessResponse;

export interface CreateTaskPayload {
  /** 업무를 생성하기 위한 DTO */
  data: CreateTaskRequestDto;
  images?: File[];
  titleimage?: File[] | undefined | string;
}

export type CreateTaskData = SuccessResponse;

export type MemberAddToTaskData = SuccessResponse;

export type MemberAddToProjectData = SuccessResponse;

export type AcceInviteData = SuccessResponse;

export type SendEmailLinkData = SuccessResponse;

export type SignupData = string;

export type GetUsersFromProjectData = SuccessResponse;

export type GetMembersByUserIdsData = SuccessResponse;

export type GetLinkData = SuccessResponse;

export type GetUsersInfoData = SuccessResponse;

export type GetCurrentUserInfoData = SuccessResponse;

export type GetUsersFromTaskData = any;

export type GetProjectsByUserLoginIdData = SuccessResponse;

export type GetProjectsData = any;

export type ReqAlarmListData = any;

export type GetTasksByProjectIdData = any;

export type GetOnlyChildrenTasksData = any;

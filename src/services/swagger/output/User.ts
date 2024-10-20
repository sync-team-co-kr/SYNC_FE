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

import {
  AcceInviteData,
  CreateProjectData,
  CreateProjectPayload,
  CreateTaskData,
  CreateTaskPayload,
  DeleteProjectData,
  DeleteProjectRequestDto,
  DeleteTaskData,
  DeleteTaskRequestDto,
  DeleteUsersFromTaskData,
  GetCurrentUserInfoData,
  GetLinkData,
  GetMembersByUserIdsData,
  GetUsersFromProjectData,
  GetUsersInfoData,
  MemberAddToProjectData,
  MemberAddToTaskData,
  MemberMappingToProjectRequestDto,
  MemberMappingToTaskRequestDto,
  MemberRemoveRequestDto,
  ModifyPwdData,
  ModifyPwdRequestDto,
  ProjectInviteRequestDto,
  SendEmailLinkData,
  SendLinkRequestDto,
  UpdateProjectData,
  UpdateProjectPayload,
  UpdateTaskData,
  UpdateTaskPayload,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class User<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description HOST = 150.136.153.235:30443 <br>Validation : 로그인 필요함, 해당 프로젝트에 속해있지 않은 유저는 업무 수정 불가 <br>DTOValidation : UpdateTaskRequestDto
   *
   * @tags task-controller
   * @name UpdateTask
   * @summary 업무를 수정하기 위한 API
   * @request PUT:/user/api/task
   * @response `200` `UpdateTaskData` OK
   */
  updateTask = (data: UpdateTaskPayload, params: RequestParams = {}) =>
    this.request<UpdateTaskData, any>({
      path: `/user/api/task`,
      method: 'PUT',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>ValidationDetails : DeleteTaskRequestDto
   *
   * @tags task-controller
   * @name DeleteTask
   * @summary 업무를 삭제하기 위한 API
   * @request DELETE:/user/api/task
   * @response `200` `DeleteTaskData` OK
   */
  deleteTask = (data: DeleteTaskRequestDto, params: RequestParams = {}) =>
    this.request<DeleteTaskData, any>({
      path: `/user/api/task`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name ModifyPwd
   * @request PUT:/user/api/pwd
   * @response `200` `ModifyPwdData` OK
   */
  modifyPwd = (data: ModifyPwdRequestDto, params: RequestParams = {}) =>
    this.request<ModifyPwdData, any>({
      path: `/user/api/pwd`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30080 <br>ValidationDetails : UpdateProjectRequestDto
   *
   * @tags project-controller
   * @name UpdateProject
   * @summary 프로젝트를 수정하기 위한 API
   * @request PUT:/user/api/project
   * @response `200` `UpdateProjectData` OK
   */
  updateProject = (data: UpdateProjectPayload, params: RequestParams = {}) =>
    this.request<UpdateProjectData, any>({
      path: `/user/api/project`,
      method: 'PUT',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>ValidationDetails : CreateProjectRequestDto
   *
   * @tags project-controller
   * @name CreateProject
   * @summary 프로젝트를 생성하기 위한 API
   * @request POST:/user/api/project
   * @response `200` `CreateProjectData` OK
   */
  createProject = (data: CreateProjectPayload, params: RequestParams = {}) =>
    this.request<CreateProjectData, any>({
      path: `/user/api/project`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>ValidationDetails : DeleteProjectRequestDto
   *
   * @tags project-controller
   * @name DeleteProject
   * @summary 프로젝트를 삭제하기 위한 API
   * @request DELETE:/user/api/project
   * @response `200` `DeleteProjectData` OK
   */
  deleteProject = (data: DeleteProjectRequestDto, params: RequestParams = {}) =>
    this.request<DeleteProjectData, any>({
      path: `/user/api/project`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>Validation : 로그인 필요함, 해당 프로젝트에 속해있지 않은 유저는 업무 생성 불가, filename의 uuid 검사 <br>DTOValidationDetails : CreateTaskRequestDto <br>depth는 parentTask의 depth에 따라 결정 되며, 최상위 업무는 0, 그 하위 업무는 1, 그 하위 업무는 2로 결정됩니다. parentTask의 depth가 2일 경우, 생성되지 않습니다. <br>
   *
   * @tags task-controller
   * @name CreateTask
   * @summary 업무를 생성하기 위한 API
   * @request POST:/user/api/task/v1
   * @response `200` `CreateTaskData` OK
   */
  createTask = (data: CreateTaskPayload, params: RequestParams = {}) =>
    this.request<CreateTaskData, any>({
      path: `/user/api/task/v1`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443
   *
   * @tags member-controller
   * @name DeleteUsersFromTask
   * @summary 업무의 담당자들을 삭제하기 위한 API
   * @request DELETE:/user/api/task/v1
   * @response `200` `DeleteUsersFromTaskData` OK
   */
  deleteUsersFromTask = (
    data: MemberRemoveRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<DeleteUsersFromTaskData, any>({
      path: `/user/api/task/v1`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>ValidationDetails : MemberMappingToTaskRequestDto
   *
   * @tags member-controller
   * @name MemberAddToTask
   * @summary 업무에 담당자를 추가하기 위한 API
   * @request POST:/user/api/member/task
   * @response `200` `MemberAddToTaskData` OK
   */
  memberAddToTask = (
    data: MemberMappingToTaskRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<MemberAddToTaskData, any>({
      path: `/user/api/member/task`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>ValidationDetails : MemberMappingToProjectRequestDto
   *
   * @tags member-controller
   * @name MemberAddToProject
   * @summary 프로젝트에 멤버를 추가하기 위한 API
   * @request POST:/user/api/member/project
   * @response `200` `MemberAddToProjectData` OK
   */
  memberAddToProject = (
    data: MemberMappingToProjectRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<MemberAddToProjectData, any>({
      path: `/user/api/member/project`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 프로젝트 초대를 수락 합니다.
   *
   * @tags invite-controller
   * @name AcceInvite
   * @summary 프로젝트 초대수락
   * @request POST:/user/api/invite
   * @response `200` `AcceInviteData` OK
   */
  acceInvite = (data: ProjectInviteRequestDto, params: RequestParams = {}) =>
    this.request<AcceInviteData, any>({
      path: `/user/api/invite`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 이메일로 프로젝트 초대장을 전송합니다.
   *
   * @tags invite-controller
   * @name SendEmailLink
   * @summary 프로젝트 이메일로 초대하기
   * @request POST:/user/api/email
   * @response `200` `SendEmailLinkData` OK
   */
  sendEmailLink = (data: SendLinkRequestDto, params: RequestParams = {}) =>
    this.request<SendEmailLinkData, any>({
      path: `/user/api/email`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443
   *
   * @tags member-controller
   * @name GetUsersFromProject
   * @summary 프로젝트의 멤버들을 가져오기 위한 API
   * @request GET:/user/api/member/v2
   * @response `200` `GetUsersFromProjectData` OK
   */
  getUsersFromProject = (
    query: {
      projectIds: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<GetUsersFromProjectData, any>({
      path: `/user/api/member/v2`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443
   *
   * @tags member-controller
   * @name GetMembersByUserIds
   * @summary 유저들의 멤버정보를 가져오기 위한 API
   * @request GET:/user/api/member/v1
   * @response `200` `GetMembersByUserIdsData` OK
   */
  getMembersByUserIds = (
    query: {
      userIds: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMembersByUserIdsData, any>({
      path: `/user/api/member/v1`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description 프로젝트 고유 초대 URL을 가져옵니다.
   *
   * @tags invite-controller
   * @name GetLink
   * @summary 프로젝트 초대 URL 가져오기
   * @request GET:/user/api/link
   * @response `200` `GetLinkData` OK
   */
  getLink = (
    query: {
      /**
       * Project PK 값
       * @format int64
       */
      projectId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetLinkData, any>({
      path: `/user/api/link`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443
   *
   * @tags user-controller
   * @name GetUsersInfo
   * @summary 유저들의 정보를 가져오는 API
   * @request GET:/user/api/info/v2
   * @response `200` `GetUsersInfoData` OK
   */
  getUsersInfo = (
    query: {
      /** 존재하지 않는 유저 아이디 입력시 오류 발생 */
      userIds: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<GetUsersInfoData, any>({
      path: `/user/api/info/v2`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443
   *
   * @tags user-controller
   * @name GetCurrentUserInfo
   * @summary 현재 로그인 유저 정보를 가져오는 API
   * @request GET:/user/api/info/v1
   * @response `200` `GetCurrentUserInfoData` OK
   */
  getCurrentUserInfo = (params: RequestParams = {}) =>
    this.request<GetCurrentUserInfoData, any>({
      path: `/user/api/info/v1`,
      method: 'GET',
      ...params,
    });
}

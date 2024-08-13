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
  CreateProjectData,
  CreateProjectRequestDto,
  CreateTaskData,
  CreateTaskPayload,
  DeleteProjectData,
  DeleteProjectRequestDto,
  DeleteTaskData,
  DeleteTaskRequestDto,
  GetCurrentUserInfoData,
  GetUsersInfoData,
  MemberAddToProjectData,
  MemberAddToTaskData,
  MemberMappingToProjectRequestDto,
  MemberMappingToTaskRequestDto,
  ModifyPwdData,
  ModifyPwdRequestDto,
  UpdateProjectData,
  UpdateProjectRequestDto,
  UpdateTaskData,
  UpdateTaskRequestDto,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class User<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description HOST = 150.136.153.235:30080
   *
   * @tags task-controller
   * @name UpdateTask
   * @summary 업무를 수정하기 위한 API
   * @request PUT:/user/api/task
   * @response `200` `UpdateTaskData` OK
   */
  updateTask = (data: UpdateTaskRequestDto, params: RequestParams = {}) =>
    this.request<UpdateTaskData, any>({
      path: `/user/api/task`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30080 <br>ValidationDetails : DeleteTaskRequestDto
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
  updateProject = (data: UpdateProjectRequestDto, params: RequestParams = {}) =>
    this.request<UpdateProjectData, any>({
      path: `/user/api/project`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30080 <br>ValidationDetails : CreateProjectRequestDto
   *
   * @tags project-controller
   * @name CreateProject
   * @summary 프로젝트를 생성하기 위한 API
   * @request POST:/user/api/project
   * @response `200` `CreateProjectData` OK
   */
  createProject = (data: CreateProjectRequestDto, params: RequestParams = {}) =>
    this.request<CreateProjectData, any>({
      path: `/user/api/project`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30080 <br>ValidationDetails : DeleteProjectRequestDto
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
   * @description HOST = 150.136.153.235:30080 <br>ValidationDetails : CreateTaskRequestDto
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
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30080 <br>ValidationDetails : MemberMappingToTaskRequestDto
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
   * @description HOST = 150.136.153.235:30080 <br>ValidationDetails : MemberMappingToProjectRequestDto
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
   * @description HOST = 150.136.153.235:30080
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
   * @description HOST = 150.136.153.235:30080
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

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
  GetImageData,
  GetOnlyChildrenTasksData,
  GetProjectsData,
  GetTaskData,
  GetTasksByProjectIdData,
  GetUsersFromTaskData,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Node2<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description HOST = 150.136.153.235:30443
   *
   * @tags project-controller
   * @name GetProjects
   * @summary 프로젝트들의 정보를 가져오기 위한 API
   * @request GET:/node2/project/api/v1
   * @response `200` `GetProjectsData` OK
   */
  getProjects = (
    query: {
      /** 존재하지 않는 프로젝트 아이디 입력시 오류 발생 */
      projectIds: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<GetProjectsData, any>({
      path: `/node2/project/api/v1`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443
   *
   * @tags member-controller
   * @name GetUsersFromTask
   * @summary 업무의 담당자들을 가져오기 위한 API
   * @request GET:/node2/api/task/v4
   * @response `200` `GetUsersFromTaskData` OK
   */
  getUsersFromTask = (
    query: {
      /** @format int64 */
      taskId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetUsersFromTaskData, any>({
      path: `/node2/api/task/v4`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443Validation : 로그인 필요하지 않음, 잘못된 taskId 입력시 오류 발생
   *
   * @tags task-controller
   * @name GetTask
   * @summary 이미지를 포함한 단일 task를 가져오는 API
   * @request GET:/node2/api/task/v3
   * @response `200` `GetTaskData` OK
   */
  getTask = (
    query: {
      /** @format int64 */
      taskId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetTaskData, any>({
      path: `/node2/api/task/v3`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>Validation : 로그인 필요하지 않음, 잘못된 taskId 입력시 오류 발생 <br>ResponseDto : GetTasksByProjectIdResponseDto
   *
   * @tags task-controller
   * @name GetTasksByProjectId
   * @summary 해당 프로젝트의 업무를 조회하기 위한 API
   * @request GET:/node2/api/task/v2
   * @response `200` `GetTasksByProjectIdData` OK
   */
  getTasksByProjectId = (
    query: {
      /** @format int64 */
      projectId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetTasksByProjectIdData, any>({
      path: `/node2/api/task/v2`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>Validation : 로그인 필요하지 않음, 잘못된 taskId 입력시 오류 발생 <br>ResponseDto : GetTasksResponseDto <br>
   *
   * @tags task-controller
   * @name GetOnlyChildrenTasks
   * @summary 해당 업무의 자식 업무를 조회하기 위한 API
   * @request GET:/node2/api/task/v1
   * @response `200` `GetOnlyChildrenTasksData` OK
   */
  getOnlyChildrenTasks = (
    query: {
      /** @format int64 */
      taskId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetOnlyChildrenTasksData, any>({
      path: `/node2/api/task/v1`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:30443 <br>Validation : 로그인 필요하지 않음, 잘못된 filename 입력시 오류 발생
   *
   * @tags task-controller
   * @name GetImage
   * @summary 파일을 가져오기 위한 API
   * @request GET:/node2/api/task/image
   * @response `200` `GetImageData` OK
   */
  getImage = (
    query: {
      filename: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetImageData, any>({
      path: `/node2/api/task/image`,
      method: 'GET',
      query: query,
      ...params,
    });
}

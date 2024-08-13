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
  GetOnlyChildrenTasksData,
  GetTaskRequestDto,
  GetUsersFromProjectData,
  ReqAlarmListData,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description HOST = 150.136.153.235:30080
   *
   * @tags member-controller
   * @name GetUsersFromProject
   * @summary 프로젝트의 멤버들을 가져오기 위한 API
   * @request GET:/api/v1/users
   * @response `200` `GetUsersFromProjectData` OK
   */
  getUsersFromProject = (
    query: {
      projectIds: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<GetUsersFromProjectData, any>({
      path: `/api/v1/users`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description 데이터베이스에 저장 된 알림 정보를 불러옵니다.
   *
   * @tags alarm-controller
   * @name ReqAlarmList
   * @summary 과거 알림 불러오기
   * @request GET:/api/user/alarm/list
   * @response `200` `ReqAlarmListData` OK
   */
  reqAlarmList = (params: RequestParams = {}) =>
    this.request<ReqAlarmListData, any>({
      path: `/api/user/alarm/list`,
      method: 'GET',
      ...params,
    });
  /**
   * @description HOST = 129.213.161.199:31585 <br>ValidationDetails : GetTaskRequestDto
   *
   * @tags task-controller
   * @name GetOnlyChildrenTasks
   * @summary 해당 업무의 자식 업무를 조회하기 위한 API
   * @request GET:/api/task/OnlyChildrenTasks,
   * @response `200` `GetOnlyChildrenTasksData` OK
   */
  getOnlyChildrenTasks = (
    query: {
      /** 해당 업무의 하위 업무를 가져오기 위한 DTO */
      getTaskRequestDto: GetTaskRequestDto;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetOnlyChildrenTasksData, any>({
      path: `/api/task/OnlyChildrenTasks,`,
      method: 'GET',
      query: query,
      ...params,
    });
}

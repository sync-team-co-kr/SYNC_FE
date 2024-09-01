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
  GetTasksByProjectIdData,
  ReqAlarmListData,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
   * @description HOST = 150.136.153.235:31585 <br>ResponseDto : GetTasksByProjectIdResponseDto
   *
   * @tags task-controller
   * @name GetTasksByProjectId
   * @summary 해당 프로젝트의 업무를 조회하기 위한 API
   * @request GET:/api/task/v2
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
      path: `/api/task/v2`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description HOST = 150.136.153.235:31585 <br>ResponseDto : GetTasksResponseDto
   *
   * @tags task-controller
   * @name GetOnlyChildrenTasks
   * @summary 해당 업무의 자식 업무를 조회하기 위한 API
   * @request GET:/api/task/v1
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
      path: `/api/task/v1`,
      method: 'GET',
      query: query,
      ...params,
    });
}

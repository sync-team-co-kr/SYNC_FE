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

import { ReqAlarmListData } from './data-contracts';
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
}

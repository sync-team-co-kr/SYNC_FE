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

import { DeleteAlarmData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 데이터베이스에 저장 된 알림을 삭제 합니다.
   *
   * @tags alarm-controller
   * @name DeleteAlarm
   * @summary 과거 알림 닫기
   * @request DELETE:/api/user/alarm/close
   * @response `200` `DeleteAlarmData` OK
   */
  deleteAlarm = (
    query: {
      /**
       * 알림 PK 값
       * @format uuid
       */
      alarmId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeleteAlarmData, any>({
      path: `/api/user/alarm/close`,
      method: 'DELETE',
      query: query,
      format: 'json',
      ...params,
    });
}

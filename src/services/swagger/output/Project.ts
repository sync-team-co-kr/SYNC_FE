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

import { GetProjectsByUserLoginIdData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Project<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description HOST = 150.136.153.235:30443
   *
   * @tags project-controller
   * @name GetProjectsByUserLoginId
   * @summary 유저가 속해있는 프로젝트들의 ID를 가져오기 위한 API
   * @request GET:/project/api/v2
   * @response `200` `GetProjectsByUserLoginIdData` OK
   */
  getProjectsByUserLoginId = (
    query: {
      /** 존재하지 않는 로그인 아이디 입력시 오류 발생 */
      userId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetProjectsByUserLoginIdData, any>({
      path: `/project/api/v2`,
      method: 'GET',
      query: query,
      ...params,
    });
}

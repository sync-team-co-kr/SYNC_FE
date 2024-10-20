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

import { TestData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Test<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags test-2-controller
   * @name Test
   * @request GET:/test
   * @response `200` `TestData` OK
   */
  test = (params: RequestParams = {}) =>
    this.request<TestData, any>({
      path: `/test`,
      method: 'GET',
      ...params,
    });
}

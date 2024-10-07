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

import { SignupData, SignupRequestDto } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Signup<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags home-controller
   * @name Signup
   * @request POST:/signup
   * @response `200` `SignupData` OK
   */
  signup = (data: SignupRequestDto, params: RequestParams = {}) =>
    this.request<SignupData, any>({
      path: `/signup`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}

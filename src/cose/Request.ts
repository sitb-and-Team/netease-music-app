/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/10
 */

import { dispatch } from './store';

/**
 * ajax请求
 * @param {any} url 请求地址
 * @param {any} method 请求方式
 * @param {any} headers 自定义header
 * @param {any} other
 * @returns {any}
 * @constructor
 */
export class Request {
  static async quest({url, method = 'GET', headers = {}, type, ...other}) {
    await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      ...other
    }).then(res => res.json(),
      error => {
        console.log('发生错误,', error);
        dispatch({
          type, payload: {
            success: false
          }
        })
      }
    )
      .then(payload => {
        console.log('请求成功=>', payload);
        dispatch({
          type, payload: {
            success: true,
            ...payload
          }
        });
      });
  }
}

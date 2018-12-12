/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/10
 */

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
  static async execute({url, method = 'GET', headers = {}, type, ...other}) {
    let response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      ...other
    });
    // 默认请求是不同的
    let res: any = {
      success: false
    };
    try {
      // 如果请求成功，转换资源格式
      if (response.ok) {
        let payload = await response.json();
        res = {
          success: true,
          payload
        };
      }
    } catch (e) {
      console.warn('出现了一个错误=>', url, e);
    }
    return {
      ...res,
      type
    }
  }
}

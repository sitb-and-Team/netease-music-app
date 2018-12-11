/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/10
 */
// index.html.js 设置的全局url
export const {api} = (global as any).config;


export default {
  user: `${api}/users`,
  register: `${api}/check-value/register`,
  password: `${api}/check-value/reset-password`
}

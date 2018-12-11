/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/8
 */
import { Receivables } from '../container/Receivables';
import { SuccessPage } from '../container/SuccessPage';
import { ErrorPage } from '../container/ErrorPage';
import { menu } from '../constants/zh-cn';

export interface RouterConfig {
  path: string;
  component: any;
  title: string;
}

// 路由path
export const routerPath = {
  receivables: '/receivables',
  success: '/success',
  error: '/error'
};

// 路由基本配置
export const routerConfig: Array<RouterConfig> = [{
  title: menu.receivables,
  path: routerPath.receivables,
  component: Receivables
}, {
  title: menu.receivablesDetailed,
  path: routerPath.success,
  component: SuccessPage
}, {
  title: menu.receivablesDetailed,
  path: routerPath.error,
  component: ErrorPage
}];

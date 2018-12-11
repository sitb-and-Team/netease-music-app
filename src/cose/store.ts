import { applyMiddleware, bindActionCreators, createStore } from 'redux';
import reducers from '../reducers';
import actions from '../actions';
import storageHistorical from '../middleware/storageHistorical';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */

// 存放绑定store api的变量
const data: any = {};

export const store = createStore(
  reducers,
  applyMiddleware(storageHistorical)
);

// 统一绑定 dispatch
data.actions = bindActionCreators(actions, store.dispatch);

// 导出绑定好dispatch的 action
export function getActions() {
  return data.actions;
}

export function dispatch(action) {
  return store.dispatch(action);
}

import { applyMiddleware, bindActionCreators, createStore } from 'redux';
import commonReducers from '../reducers';
import commonEpics from '../actions';
import storageHistorical from '../middleware/storageHistorical';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import * as actionTypes from '../constants/actionType';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */

// 绑定rxjs，combineEpics 需要数组函数
const appEpics: Array<any> = [];
Object.keys(commonEpics).forEach(action => {
  let commonActions = {...commonEpics[action]};
  Object.keys(commonActions).forEach(commonAction => appEpics.push(commonActions[commonAction]));
});

const rootEpic: any = combineEpics(...appEpics);
const epicMiddleware = createEpicMiddleware();

// 存放绑定store api的变量
const data: any = {};

// 生成store
export const store = createStore(
  commonReducers,
  applyMiddleware(
    storageHistorical,
    epicMiddleware
  )
);
epicMiddleware.run(rootEpic);

// 绑定dispatch，遍历actionType 绑定payload
let actions: any = {};
Object.keys(actionTypes).forEach(action => Object.keys(actionTypes[action]).forEach(type => {
  if (!actions[action]) {
    actions[action] = {};
  }
  actions[action][type] = bindActionCreators((...args) => ({
    type: actionTypes[action][type],
    payload: args
  }), store.dispatch)
}));

data.actions = actions;

// 导出绑定好dispatch的 action
export function getActions() {
  return data.actions;
}

export function dispatch(action) {
  return store.dispatch(action);
}

export function getStore() {
  return store;
}

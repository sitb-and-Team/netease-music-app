/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */
import { search as types } from '../constants/actionType';
import { Request } from '../cose/Request';
import URL from '../constants/URL';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/internal/operators';

export function search(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => Request.quest({
      url: `${URL.search}?keywords=${payload}`,
      type: types.queryComplete
    })))
}

export function searchs(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => Request.quest({
      url: `${URL.search}?keywords=${payload}`,
      type: types.queryComplete
    })))
}

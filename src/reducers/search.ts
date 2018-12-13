/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */
import { search as types } from '../constants/actionType';
import objectPath from 'object-path';
import { Map } from 'Immutable';

const initialState: any = Map({
  page: {
    songs: [],
    songCount: 0
  },
  processing: false
});

export function search(state = initialState, action) {
  switch (action.type) {
    case types.startQuery: {
      return initialState
        .set('processing', true)
    }
    case types.queryComplete: {
      const {success, payload} = action;
      let result = objectPath.get(payload, 'result');
      let songs = objectPath.get(payload, 'result.songs');

      let page = (success && result && songs) && result || initialState.get('page');
      return initialState
        .set('page', page)
        .set('processing', false)
    }
    default: {
      return state;
    }
  }
}

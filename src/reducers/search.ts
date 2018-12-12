/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */
import { search as types } from '../constants/actionType';
import objectPath from 'object-path';

const initialState: any = {
  content: {
    songs: [],
    songCount: 0
  },
  processing: false
};

export function search(state = initialState, action) {
  switch (action.type) {
    case types.startQuery: {
      return {
        ...state,
        processing: true
      };
    }
    case types.queryComplete: {
      const {success, payload} = action;
      let result = objectPath.get(payload, 'result');
      let songs = objectPath.get(payload, 'result.songs');
      return {
        ...state,
        processing: false,
        content: (success && result && songs) && payload.result || state.content
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}

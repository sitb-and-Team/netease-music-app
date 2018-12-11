/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */
import { search as types } from '../constants/actionType';

const initialState: any = {
  content: {
    songs: [],
    songCount: 0
  },
  processing: false
};

export function search(state = initialState, {type, payload}) {
  switch (type) {
    case types.startQuery: {
      return {
        ...state,
        processing: true
      };
    }
    case types.queryComplete: {
      const {success, result} = payload;
      console.log(payload);
      return {
        ...state,
        processing: false,
        content: (success && result && result.songs) && result || state.content
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}

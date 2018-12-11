/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */
import { search as types } from '../constants/actionType';
import { Request } from '../cose/Request';
import URL from '../constants/URL';

export function search(value) {
  Request.quest({
    url: `${URL.search}?keywords=${value}`,
    type: types.queryComplete
  });
  return ({
    type: types.startQuery
  })
}

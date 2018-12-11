/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */
function createActionType(key, types): string {
  let newTypes: any = {};
  Object.keys(types).forEach(type => newTypes[type] = `${key}-${type}`);
  return newTypes;
}

// 搜索
export const search: any = createActionType('search', {
  startQuery: '',
  queryComplete: ''
});


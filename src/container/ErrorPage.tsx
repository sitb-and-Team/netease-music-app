/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/27
 */
import * as React from 'react';
import { OrderDetails } from '../components/OrderDetails';

/**
 * 失败
 */
export class ErrorPage extends React.Component<any, any> {

  render() {
    return (
      <OrderDetails isFailure/>
    )
  }
}

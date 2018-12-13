/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/7
 */
import './styles/index.scss';
import 'whatwg-fetch'
import 'babel-polyfill';
import 'es6-promise';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Promise } from 'es6-promise';
import { Provider } from 'react-redux'
import { Application } from './container/Application';
import { getStore } from './cose/store';

require('es6-promise').polyfill();

function run() {
  ReactDOM.render(
    <main>
      <section className="background"/>
      <Provider store={getStore()}>
        <Application/>
      </Provider>
    </main>,
    document.getElementById('application') as HTMLElement
  );
}

// 异步回调加载
new Promise((resolve: any) => {
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', resolve);
  } else {
    (window as any).attachEvent('onload', resolve);
  }
}).then(run);

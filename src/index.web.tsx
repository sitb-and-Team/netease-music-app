/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/7
 */
import 'whatwg-fetch'
import 'babel-polyfill';
import 'es6-promise';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Promise } from 'es6-promise';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import './styles/index.scss';
import { RouterConfig, routerConfig, routerPath } from './cose/router.config';
import { ErrorBoundary } from './container/ErrorBoundaries';

require('es6-promise').polyfill();

const theme = createMuiTheme({
  palette: {
    primary: {main: blue[500]},
    secondary: {
      main: blue[500],
      contrastText: '#fff'
    }
  }
});

function run() {
  ReactDOM.render(
    <main>
      <section className="background"/>
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <ErrorBoundary>
            <Switch>
              {
                routerConfig.map((values: RouterConfig, index) => {
                  document.title = values.title || '';
                  return (
                    <Route exact
                           key={index}
                           path={values.path}
                           component={values.component}
                    />
                  )
                })
              }
              <Route exact
                     path={'/'}
                     render={() => (<Redirect to={routerPath.receivables}/>)}
              />
            </Switch>
          </ErrorBoundary>
        </MuiThemeProvider>
      </HashRouter>
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

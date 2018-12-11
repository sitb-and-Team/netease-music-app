/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/11
 */
import * as React from 'react';
import { routerConfig, RouterConfig, routerPath } from '../cose/router.config';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import { ErrorBoundary } from './ErrorBoundaries';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';


const theme = createMuiTheme({
  palette: {
    primary: {main: blue[500]},
    secondary: {
      main: blue[500],
      contrastText: '#fff'
    }
  }
});

export class Application extends React.Component {

  render() {
    return (
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
    )
  }
}

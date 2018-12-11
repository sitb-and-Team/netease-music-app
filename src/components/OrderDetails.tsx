/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/28
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import HighlightOffOutlined from '@material-ui/icons/HighlightOffOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export class OrderDetails extends React.Component<any, any> {

  renderListItem(lists) {
    return lists.map((list, index) => (
      <ListItem key={index}>
        <Grid item
              xs={5}
              md={5}
        >
          <ListItemText secondary={`${list.label}:`}/>
        </Grid>
        <Grid item
              xs={12}
              md={12}
        >
          <ListItemText primary={list.value}/>
        </Grid>
      </ListItem>
    ));
  }

  render() {
    const {isFailure} = this.props;
    const config = [{
      label: '当前状态',
      value: isFailure && '失败' || '成功'
    }, {
      label: '商户全称',
      value: 'xxx小卖部'
    }, {
      label: '支付流水号',
      value: '600003423411001'
    }, {
      label: '支付时间',
      value: '2018年11月28日 11:09:20'
    }];
    return (
      <Grid style={{padding: 12}}>
        <Grid container
              alignItems="center"
              direction="column"
              style={{paddingTop: 24, paddingBottom: 24}}
        >
          {
            isFailure && (
              <HighlightOffOutlined style={{fontSize: 70, color: 'red'}}/>
            ) || (
              <CheckCircleOutline style={{fontSize: 70, color: '#62b900'}}/>
            )
          }
          <Typography variant="h5"
                      align="center"
                      gutterBottom
          >
            {'yangyao'}
          </Typography>
          <Typography variant="h4"
                      align="center"
                      gutterBottom
          >
            {`+1000`}
          </Typography>
        </Grid>
        <Divider/>
        <Grid container>
          <List dense
                style={{width: '100%'}}
          >
            {
              this.renderListItem(config)
            }
          </List>
        </Grid>
      </Grid>
    )
  }
}

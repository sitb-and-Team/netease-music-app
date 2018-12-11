/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/27
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Store from '@material-ui/icons/Store';
import { autoBind } from '@sitb/wbs/autoBind';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '../components/Button';
import TextField from '@material-ui/core/TextField';
import { NumberFormatCustom } from '../components/Input/NumberFormatCustom';
import { lang } from '../constants/zh-cn';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNext from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import { queryToObjectWithUrl } from '@sitb/wbs/utils/HttpUtil';

const styles: any = theme => ({
  header: {
    paddingTop: 40,
    paddingBottom: 20
  },
  headerLogo: {
    fontSize: 70
  },
  headerMerchantName: {
    marginTop: -10
  },
  headerMerchantNo: {
    marginTop: -5,
    fontSize: 12,
    color: 'rgba(173,173,173,1)'
  },
  content: {
    marginTop: 40,
    marginLeft: 12,
    marginRight: 12
  },
  contentSubmit: {
    marginTop: 30
  },
  drawerContent: {
    padding: 12
  },
  drawerContentTitle: {
    paddingTop: 5,
    paddingBottom: 5
  },
  contentTitleCloseBtn: {
    position: 'absolute',
    marginTop: -15
  },
  contentTitleTitle: {
    fontSize: 14,
    textAlign: 'center'
  },
  drawerAmount: {
    marginTop: 12
  },
  drawerList: {
    marginTop: 30
  }
});

@autoBind
class Container extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    let amount = '';
    let isAmount = false;
    // 获取url中的参数，是否有金额字段
    const href = location.href;
    if (href.indexOf('?') !== -1) {
      const {transactionAmount} = queryToObjectWithUrl(href);
      if (transactionAmount) {
        amount = transactionAmount;
        isAmount = true;
      }
    }
    this.state = {
      amount,
      isAmount,
      isPayState: false
    };
  }

  /**
   * 保存金额
   * @param event
   * @param key
   */
  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  };

  /**
   * 准备交易
   */
  handleStartPay() {
    this.switchDrawer(true);
  }

  /**
   * drawer开关
   * @param status 状态
   */
  switchDrawer(status) {
    this.setState({isPayState: status})
  }

  /**
   * 开始交易
   */
  handlePay() {
    const {history} = this.props;
    history.push('/success');
  }

  renderHandle() {
    const {classes} = this.props;
    return (
      <Grid container
            justify="center"
            direction="column"
            alignItems="center"
            className={classes.header}
      >
        <Store className={classes.headerLogo}/>
        <Typography variant="subtitle1"
                    className={classes.headerMerchantName}
        >
          {'yangyao'}
        </Typography>
        <Typography variant="body2"
                    className={classes.headerMerchantNo}
                    gutterBottom
        >
          {"6001023010222"}
        </Typography>
      </Grid>
    );
  }

  renderContent() {
    const {classes} = this.props;
    const {amount, isAmount} = this.state;
    return (
      <Grid className={classes.content}
            container
      >
        <FormControl fullWidth>
          <TextField className={classes.formControl}
                     label={lang.receivablesAmount}
                     value={amount}
                     disabled={isAmount}
                     onChange={e => this.handleChange(e, 'amount')}
                     id="adornment-amount"
                     InputProps={{
                       inputComponent: NumberFormatCustom
                     }}
          />
          <Button children={lang.confirm}
                  className={classes.contentSubmit}
                  disabled={amount === ''}
                  onClick={this.handleStartPay}
          />
        </FormControl>
      </Grid>
    )
  }

  render() {
    const {classes} = this.props;
    const {isPayState, amount} = this.state;
    return (
      <Grid container
            justify="center"
      >
        {this.renderHandle()}
        {this.renderContent()}
        <Drawer anchor="bottom"
                open={isPayState}
        >
          <Grid className={classes.drawerContent}>
            <Grid className={classes.drawerContentTitle}>
              <IconButton className={classes.contentTitleCloseBtn}
                          onClick={() => this.switchDrawer(false)}
              >
                <Clear/>
              </IconButton>
              <Typography variant="h5"
                          gutterBottom
                          className={classes.contentTitleTitle}
              >
                {lang.payDetailed}
              </Typography>
            </Grid>
            <Divider/>
            <Typography variant="h3"
                        align="center"
                        gutterBottom
                        className={classes.drawerAmount}
            >
              {`¥${amount}`}
            </Typography>
            <List component="nav"
                  className={classes.drawerList}
            >
              <ListItem>
                <ListItemText secondary={lang.orderDetailed}/>
                <Typography variant="body1">
                  {lang.receivables}
                </Typography>
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText secondary={lang.payType}/>
                <Typography variant="body1"
                >
                  {lang.weChat}
                </Typography>
                <NavigateNext/>
              </ListItem>
              <Button children={lang.pay}
                      className={classes.contentSubmit}
                      disabled={amount === ''}
                      onClick={this.handlePay}
              />
            </List>
          </Grid>
        </Drawer>
      </Grid>
    )
  }
}

export const Receivables = withStyles(styles)(Container as any);

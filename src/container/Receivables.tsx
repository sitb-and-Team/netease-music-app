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
import { lang } from '../constants/zh-cn';
import { Request } from '../cose/Request';
import URL from '../constants/URL';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/es/ListItem';
import Avatar from '@material-ui/core/es/Avatar';
import ListItemText from '@material-ui/core/es/ListItemText';

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
  }
});

@autoBind
class Container extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      keywords: '',
      isPayState: false,
      songCount: 0,
      songs: []
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
    const {keywords} = this.state;
    Request({
      url: `${URL.search}?keywords=${keywords}`
    }).then(ref => {
      const {result: {songCount, songs}} = ref;
      this.setState({songCount, songs});
    });
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
    const {keywords} = this.state;
    return (
      <Grid className={classes.content}
            container
      >
        <FormControl fullWidth>
          <TextField className={classes.formControl}
                     label={lang.receivablesAmount}
                     value={keywords}
                     onChange={e => this.handleChange(e, 'keywords')}
                     id="adornment-amount"
          />
          <Button children={lang.confirm}
                  className={classes.contentSubmit}
                  disabled={keywords === ''}
                  onClick={this.handleStartPay}
          />
        </FormControl>
      </Grid>
    )
  }

  renderListItem() {
    const {songs} = this.state;
    return songs.map((song, index) => {
      const {name, album, artists} = song;
      return (
        <ListItem key={index}
                  button
        >
          <Avatar>
            <img src={album.artist.img1v1Url}/>
          </Avatar>
          <ListItemText primary={name}
                        secondary={`${album.name}-${artists[0].name}`}
          />
        </ListItem>
      )
    });
  }

  render() {
    const {songCount} = this.state;
    return (
      <Grid container
            justify="center"
      >
        {this.renderHandle()}
        {this.renderContent()}
        <div>
          <span>{`搜索结果:${songCount}`}</span>
        </div>
        <List>
          {this.renderListItem()}
        </List>
      </Grid>
    )
  }
}

export const Receivables = withStyles(styles)(Container as any);

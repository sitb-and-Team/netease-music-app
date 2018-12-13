/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/27
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Map } from 'Immutable';
import Grid from '@material-ui/core/Grid';
import Store from '@material-ui/icons/Store';
import { autoBind } from '@sitb/wbs/autoBind';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/es/ListItem';
import Avatar from '@material-ui/core/es/Avatar';
import ListItemText from '@material-ui/core/es/ListItemText';

import { getActions } from '../cose/store';
import Button from '../components/Button';
import { lang } from '../constants/zh-cn';

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
      data: Map({
        keywords: ''
      })
    };
  }

  /**
   * 搜索字段
   * @param event
   * @param key
   */
  handleChange(event, key) {
    const value = event.target.value;
    this.setState(({data}) => ({
      data: data.update(key, () => value)
    }));
  };

  /**
   * search
   */
  handleSearch() {
    const keywords = this.state.data.get('keywords');
    getActions().search.startQuery(keywords);
    console.log('search', keywords);
  }

  /**
   * 生成头部
   * @returns {any}
   */
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

  /**
   * 生成内容
   * @returns {any}
   */
  renderContent() {
    const {classes} = this.props;
    const processing = this.props.search.get('processing');
    // 搜索key
    const keywords = this.state.data.get('keywords');
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
                  loading={processing}
                  className={classes.contentSubmit}
                  disabled={keywords === ''}
                  onClick={this.handleSearch}
          />
        </FormControl>
      </Grid>
    )
  }

  /**
   * 生成结果list
   * @returns {any[]}
   */
  renderListItem() {
    const {songs} = this.props.search.get('page');
    return songs.map((song: any, index) => {
      // 歌曲name, 详情album, 作者信息artists
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
    const {songCount} = this.props.search.get('page');
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

export const Receivables = connect((state) => ({
  search: state.get('search')
}))(withStyles(styles)(Container as any));

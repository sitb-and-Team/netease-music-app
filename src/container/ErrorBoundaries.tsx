/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/12/10
 */
import * as React from 'react';

const styles: any = {
  background: {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${require("../assets/error.png")})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  button: {
    position: 'absolute',
    top: '80%',
    width: '50%',
    margin: '0 25%',
    padding: '10px 30px',
    border: '2px solid #909090',
    borderRadius: 5,
    background: 'rgba(138, 209, 242,1)',
    color: '#fff'
  }
};

export class ErrorBoundary extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  handleGoToHome = () => {
    console.log('go to home');
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({hasError: true});
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={styles.background}>
          <button style={styles.button}
                  onClick={this.handleGoToHome}
          >{"返回"}</button>
        </div>
      );
    }
    return this.props.children;
  }
}

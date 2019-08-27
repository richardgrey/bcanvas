import React, { Component } from 'react';
import './Landing.scss';

class LandingParallaxBg extends Component {
  state = {
    pageY: 0,
  };

  div = React.createRef();

  componentDidMount() {
    this.rate = 0.15;
    // this.rate = this.div.current.offsetTop / document.documentElement.scrollHeight;
    window.addEventListener('scroll', this.scroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll, false);
  }

  scroll = () => {
    this.setState({
      pageY: window.pageYOffset * this.rate,
    });
  };

  render() {
    const { pageY } = this.state;
    return (
      <div
        ref={this.div}
        className="landing__bg"
        style={{ transform: `translate3d(0, -${pageY}px, 0)` }}
      />
    );
  }
}

export default LandingParallaxBg;

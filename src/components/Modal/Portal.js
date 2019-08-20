import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onRendered: PropTypes.func,
  };

  static defaultProps = {
    onRendered: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.forceUpdate(this.props.onRendered);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, document.body);
  }
}

export default Portal;

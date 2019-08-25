import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    container: PropTypes.instanceOf(Element),
    onRendered: PropTypes.func,
  };

  static defaultProps = {
    onRendered: null,
    container: document.body,
  };

  render() {
    const { children, container } = this.props;
    return ReactDOM.createPortal(children, container);
  }
}

export default Portal;

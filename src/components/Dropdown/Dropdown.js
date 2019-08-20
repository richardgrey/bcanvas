import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { hrefPropType } from '../../utils/propTypes';
import isEventIn from '../../utils/isEventIn';

import './Dropdown.scss';

class Dropdown extends Component {
  static propTypes = {
    toggle: PropTypes.node,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: hrefPropType,
        action: PropTypes.func,
      }),
    ).isRequired,
    before: PropTypes.node,
    after: PropTypes.node,
  };

  static defaultProps = {
    toggle: null,
    before: null,
    after: null,
  };

  state = {
    isShown: false,
  };

  constructor(props) {
    super(props);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  componentWillUnmount() {
    this.unbindDocumentClick();
  }

  onDocumentClick(e) {
    const { isShown } = this.state;

    if (isShown && !isEventIn(e, this.dropdown)) {
      this.toggle(false);
    }
  }

  bindDocumentClick() {
    document.addEventListener('click', this.onDocumentClick, false);
  }

  unbindDocumentClick() {
    document.removeEventListener('click', this.onDocumentClick, false);
  }

  toggle(flag) {
    const { isShown } = this.state;
    const newIsShown = typeof flag === 'boolean' ? flag : !isShown;

    if (newIsShown) {
      this.bindDocumentClick();
    } else {
      this.unbindDocumentClick();
    }

    this.setState({
      isShown: newIsShown,
    });
  }

  renderMenu() {
    const { items, before, after } = this.props;
    const renderMenuItem = ({ label, href, action }) => {
      if (action) {
        return (
          <li className="dropdown__item" key={label}>
            <span
              className="dropdown__button"
              onClick={() => action()}
              onKeyPress={e => e.key === 'Enter' && action()}
              role="button"
              tabIndex="0"
            >
              {label}
            </span>
          </li>
        );
      }

      return (
        <li className="dropdown__item" key={label}>
          <Link className="dropdown__button" to={href}>
            {label}
          </Link>
        </li>
      );
    };

    return (
      <div className="dropdown__menu">
        {before ? <div className="dropdown__before">{before}</div> : null}
        <ul className="dropdown__list">{items.map(renderMenuItem)}</ul>
        {after ? <div className="dropdown__after">{after}</div> : null}
      </div>
    );
  }

  render() {
    const { isShown } = this.state;
    const { toggle } = this.props;

    return (
      <div
        className="dropdown"
        ref={ref => { this.dropdown = ref; }}
      >
        {React.cloneElement(toggle, {
          onClick: () => this.toggle(),
        })}
        {isShown ? this.renderMenu() : null}
      </div>
    );
  }
}

export default Dropdown;

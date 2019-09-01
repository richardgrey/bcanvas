import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Icon from '../Icon/Icon';
import './CookieBadge.scss';

const cookieAgreed = Cookies.get('c');

class CookieBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreed: cookieAgreed,
    };
  }

  agreed = () => {
    this.setState({ agreed: true });
    Cookies.set('c', 1);
  };

  render() {
    return this.state.agreed ? null : (
      <div className="cookie-badge">
        <button type="button" className="cookie-badge__close" onClick={this.agreed}>
          <Icon name="cross" />
        </button>
        We uses cookies to allow us to better understand how the site is used. By continuing to use
        this site, you consent to this <Link to="/cookie-policy">Cookie Policy</Link>
      </div>
    );
  }
}

const CookieBadgeNone = () => null;

export default cookieAgreed ? CookieBadgeNone : CookieBadge;

import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '../Grid/Grid';
import Icon from '../Icon/Icon';
import './Footer.scss';

const year = new Date().getFullYear();

const Footer = () => (
  <div className="footer">
    <Grid valign="top">
      <Grid.Col xl={5} md={6}>
        <div className="footer__logo">
          <Icon name="logo-bw" />
        </div>
        <div className="footer__copy">
          <p>
            Designed and developed  by Igor{'\u00A0'}Nikolenko.
            <br />
            Illustrations by{' '}
            <a href="https://manypixels.co/" target="_blank" rel="noopener noreferrer">
              manypixels.co
            </a>
          </p>
          <p>©{2019 - year ? `2019-${year}` : year}</p>
        </div>
      </Grid.Col>
      <Grid.Col xl={6} xlOffset={1} md={6}>
        <ul className="footer__menu">
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms & Conditions</Link>
          </li>
        </ul>
        <ul className="footer__menu">
          <li>
            <a href="mailto:igor@bcanvas.io">Email</a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/igor-nikolenko/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <ul className="footer__menu">
          <li>
            <a
              href="https://github.com/richardgrey/bcanvas"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </Grid.Col>
    </Grid>
  </div>
);

export default Footer;

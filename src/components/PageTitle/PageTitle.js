import React from 'react';
import PropTypes from 'prop-types';
import './PageTitle.scss';

const PageTitle = ({ title, subtitle}) => (
  <div className="page-title">
    <h1 className="page-title__title">{title}</h1>
    {subtitle ? <p className="page-title__subtitle">{subtitle}</p> : null}
  </div>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

PageTitle.defaultProps = {
  subtitle: null,
};

export default PageTitle;

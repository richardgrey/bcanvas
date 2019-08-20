/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import './Icon.scss';

const Icon = ({ name, className, ...other }) => {
  const useTag = `<use xlink:href="#${name}" />`;
  return (
    <svg
      className={`icon icon_${name} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: useTag }}
      {...other}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: null,
};

export default Icon;

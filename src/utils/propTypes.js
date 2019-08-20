import PropTypes from 'prop-types';

export const locationPropType = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  state: PropTypes.object,
});

export const hrefPropType = PropTypes.oneOfType([PropTypes.string, locationPropType]);

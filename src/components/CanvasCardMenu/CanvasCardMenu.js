import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';

const CanvasCardMenu = ({ canvas, onDelete }) => {
  const dropdownMenu = [
    {
      label: 'Edit',
      href: `/canvas/${canvas.id}`,
    },
    {
      label: 'Share',
      href: '/',
    },
    {
      label: 'Delete',
      action: () => {
        if (onDelete) {
          onDelete();
        }
      },
      styleType: 'danger',
    },
  ];

  return (
    <Dropdown items={dropdownMenu} align="top-right">
      <Button size="x-small">Menu</Button>
    </Dropdown>
  );
};

CanvasCardMenu.propTypes = {
  canvas: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};

CanvasCardMenu.defaultProps = {
  onDelete: undefined,
};

export default CanvasCardMenu;

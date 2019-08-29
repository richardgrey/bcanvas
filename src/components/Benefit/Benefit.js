import React from 'react';
import PropType from 'prop-types';
import b from 'b_';
import { Picture } from 'react-responsive-picture';
import Grid from '../Grid/Grid';
import './Benefits.scss';

const { Row, Col } = Grid;

const Benefit = ({ img, title, description, reverse }) => (
  <Grid className={b('benefit', { reverse })}>
    <Row valign="center">
      <Col xl={7} xlOffset={0} md={8} mdOffset={2}>
        <Picture className="benefit__img" alt="business" {...img} />
      </Col>
      <Col xl={5} xlOffset={0} md={8} mdOffset={2}>
        <div className="benefit__content">
          <h2 className="h1 benefit__title">{title}</h2>
          <p className="benefit__description">{description}</p>
        </div>
      </Col>
    </Row>
  </Grid>
);

Benefit.propTypes = {
  img: PropType.shape({
    src: PropType.string,
    srcSet: PropType.string,
  }).isRequired,
  title: PropType.string.isRequired,
  description: PropType.string.isRequired,
  reverse: PropType.bool,
};

Benefit.defaultProps = {
  reverse: false,
};

export default Benefit;

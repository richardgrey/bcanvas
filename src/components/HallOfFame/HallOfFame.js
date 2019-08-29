import React from 'react';
import './HallOfFame.scss';
import Grid from '../Grid/Grid';
import Section from '../Section/Section';

const { Row, Col } = Grid;

const HallOfFame = () => (
  <div className="hall-of-fame">
    <h2 className="h1 text_align_center">Hall of Fame</h2>
    <Section spacing="small">
      <Grid>
        <Row>
          <Col xl={3} xlOffset={2} md={3} mdOffset={1} xs={10} xsOffset={1}>
            <p>
              <img src={require('../HallOfFame/img/osterwalder.jpg')} alt="Alexander Osterwalder" />
            </p>
          </Col>
          <Col xl={5} md={7} mdOffset={0} xs={10} xsOffset={1}>
            <h3>Alexander Osterwalder</h3>
            <p>
              Swiss PhD in management information systems, business theorist, entrepreneur, author.
              Back in 2008 he originally proposed Business Model Canvas and make it popular with his
              bestseller book{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.com/dp/0470876417"
              >
                Business Model Generation
              </a>
              .
            </p>
            <p>
              Later he also proposed{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.com/dp/1118968050"
              >
                Value Proposition Canvas
              </a>{' '}
              for a deeper understanding of customers and designing products and services that will
              fit their needs.
            </p>
          </Col>
        </Row>
      </Grid>
    </Section>
    <Section spacing="small">
      <Grid>
        <Row valign="center">
          <Col xl={3} xlOffset={2} md={3} mdOffset={1} xs={10} xsOffset={1}>
            <p>
              <img src={require('../HallOfFame/img/maurya.jpg')} alt="Ash Maurya" />
            </p>
          </Col>
          <Col xl={5} md={7} mdOffset={0} xs={10} xsOffset={1}>
            <h3>Ash Maurya</h3>
            <p>
              Ash adapted Osterwalder’s business model canvas and optimized for Lean Startups. He
              popularising Lean Startup ideas in iconic{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.com/dp/1449305172/"
              >
                Lean Startup
              </a>{' '}
              and{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.com/dp/1101980524/"
              >
                Scaling Lean
              </a>{' '}
              books.
            </p>
          </Col>
        </Row>
      </Grid>
    </Section>
  </div>
);

export default HallOfFame;

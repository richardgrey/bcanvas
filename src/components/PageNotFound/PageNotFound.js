import React from 'react';
import './PageNotFound.scss';
import Grid from '../Grid/Grid';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const PageNotFound = () => (
  <Grid className="page-not-found">
    <Grid.Row valign="center">
      <Grid.Col md={5} mdOffset={1}>
        <div className="page-not-found__content">
          <h1>Lost in space</h1>
          <p>There is a mistake in the page’s web address, or{'\u00a0'}the page is deleted.</p>
          <p>
            <Button href="/" size="x-small">
              <Icon name="arrow-back" /> Back to home
            </Button>
          </p>
        </div>
      </Grid.Col>
      <Grid.Col md={6}>
        <img src={`${process.env.PUBLIC_URL}/img/page-not-found-4.png`} alt="404" />
        <p className="page-not-found__caption">
          Illustration by{' '}
          <a href="https://icons8.com" target="_blank" rel="noreferrer noopener">
            Ouch.pics
          </a>
        </p>
      </Grid.Col>
    </Grid.Row>
  </Grid>
);

export default PageNotFound;

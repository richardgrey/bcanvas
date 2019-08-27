import React from 'react';
import Button from '../Button/Button';
import './Hero.scss';

const Hero = () => (
  <div className="hero">
    <h1 className="hero__title">
      Start your next idea with a{'\u00A0'}business model, value proposition or lean canvas
    </h1>
    <h2 className="hero__subtitle">
      Free online tool that helps you to visualise and share your business ideas.
    </h2>
    <p className="hero__cta">
      <Button href="/register">Start using for FREE</Button>
    </p>
  </div>
);

export default Hero;

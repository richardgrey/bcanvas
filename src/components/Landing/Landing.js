import React from 'react';
import Hero from '../Hero/Hero';
import CreateCanvasSection from '../CreateCanvasSection/CreateCanvasSection';

const Landing = () => (
  <>
    <Hero />
    <CreateCanvasSection withDescription withCTA />
  </>
);

export default Landing;

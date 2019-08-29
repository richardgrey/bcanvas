import React from 'react';
import LandingParallaxBg from './LandingParalaxBg';
import Hero from '../Hero/Hero';
import Section from '../Section/Section';
import CreateCanvasSection from '../CreateCanvasSection/CreateCanvasSection';
import Layout from '../Layout/Layout';
import Brands from '../Brands/Brands';
import SamplesList from '../SamplesList/SamplesList';
import Button from '../Button/Button';
import Benefit from '../Benefit/Benefit';
import FeaturesTabs from '../FeaturesTabs/FeaturesTabs';
import HallOfFame from '../HallOfFame/HallOfFame';

import benefits from '../Benefit/local';

const Landing = () => (
  <Layout.Container>
    <LandingParallaxBg />

    <Layout.Inner>
      <Hero />
      <Section spacing="large">
        <CreateCanvasSection withDescription withCTA />
      </Section>
    </Layout.Inner>

    <Section fluid bg="lightgray" spacing="small" indent="small">
      <Layout.Inner>
        <Section>
          <FeaturesTabs />
        </Section>
        <Section>
          <h3 className="text_align_center">Millions of people use Business Model Canvas</h3>
          <Brands />
        </Section>
      </Layout.Inner>
    </Section>

    <Layout.Inner>
      {benefits.map((benefit, i) => (
        <Section spacing="small" key={benefit.title}>
          <Benefit {...benefit} reverse={!(i % 2)} />
        </Section>
      ))}
    </Layout.Inner>

    <Section fluid bg="lightgray" spacing="large" indent="large">
      <Layout.Inner>
        <h2 className="h2 text_align_center">Companies you know mapped on{'\u00A0'}canvas</h2>
        <SamplesList />
        <div className="text_align_center">
          <Button href="/register">Try for FREE</Button>
        </div>
      </Layout.Inner>
    </Section>

    <Layout.Inner>
      <HallOfFame />
    </Layout.Inner>
  </Layout.Container>
);

export default Landing;

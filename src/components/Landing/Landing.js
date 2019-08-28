import React from 'react';
import { Picture } from 'react-responsive-picture';
import Hero from '../Hero/Hero';
import Section from '../Section/Section';
import CreateCanvasSection from '../CreateCanvasSection/CreateCanvasSection';
import Tabs from '../Tabs/Tabs';
import Layout from '../Layout/Layout';
import Brands from '../Brands/Brands';
import Grid from '../Grid/Grid';
import Button from '../Button/Button';
import SamplesList from '../SamplesList/SamplesList';
import LandingParallaxBg from './LandingParalaxBg';

const TabPane = Tabs.TabsPane;
const { Row, Col } = Grid;

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
          <h2 className="h1 text_align_center">Design innovative business model</h2>
          <Tabs align="right">
            <TabPane key="business" tab="Business Model Canvas">
              <Picture
                className="elevation-12"
                alt="business"
                src={require('./img/canvas-business.jpg')}
              />
            </TabPane>
            <TabPane key="value" tab="Value Proposition Canvas">
              <Picture
                className="elevation-12"
                alt="business"
                src={require('./img/canvas-business.jpg')}
              />
            </TabPane>
            <TabPane key="lean" tab="Lean Canvas">
              <Picture
                className="elevation-12"
                alt="business"
                src={require('./img/canvas-business.jpg')}
              />
            </TabPane>
          </Tabs>
        </Section>
        <Section>
          <h3 className="text_align_center">Millions of people use Business Model Canvas</h3>
          <Brands />
        </Section>
      </Layout.Inner>
    </Section>

    <Layout.Inner>
      <Section spacing="small">
        <Grid className="landing__benefits landing__benefits_reverse">
          <Row valign="center">
            <Col xl={7} xlOffset={0} md={8} mdOffset={2}>
              <p>
                <Picture alt="business" src={require('./img/business_map_2.svg')} />
              </p>
            </Col>
            <Col xl={5} xlOffset={0} md={8} mdOffset={2} xs={10} xsOffset={1}>
              <h2 className="h1">
                Put your business on{'\u00A0'}the{'\u00A0'}map
              </h2>
              <p>
                The business model canvas is a great tool to help you understand a business model in
                a straightforward, structured way. Using this canvas will lead to insights about the
                customers you serve, what value propositions are offered through what channels, and
                how your company makes money. You can use the business model canvas to understand
                your own business model or that of a competitor! The business model canvas was
                created by Alexander Osterwalder, of Strategyzer.
              </p>
            </Col>
          </Row>
        </Grid>
      </Section>
      <Section spacing="small">
        <Grid className="landing__benefits">
          <Row valign="center">
            <Col xl={7} xlOffset={0} md={8} mdOffset={2}>
              <p>
                <Picture alt="business" src={require('./img/problem_solving_2.svg')} />
              </p>
            </Col>
            <Col xl={5} xlOffset={0} md={8} mdOffset={2} xs={10} xsOffset={1}>
              <h2 className="h1">Come up with great{'\u00A0'}ideas</h2>
              <p>
                When it is time to really understand your customers, including their
                jobs-to-be-done, pains, and gains, as well as your offer to them, the Value
                Proposition Canvas, developed by Alex Osterwalder at Strategyzer, is one of the best
                tools available to help you.
              </p>
            </Col>
          </Row>
        </Grid>
      </Section>
      <Section spacing="small">
        <Grid className=" landing__benefits_reverse">
          <Row valign="center">
            <Col xl={7} xlOffset={0} md={8} mdOffset={2}>
              <p>
                <Picture alt="business" src={require('./img/startup_2_lime.svg')} />
              </p>
            </Col>
            <Col xl={5} xlOffset={0} md={8} mdOffset={2} xs={10} xsOffset={1}>
              <h2 className="h1">Find new solutions for old problems</h2>
              <p>
                Lean Canvas is a 1-page business plan template that helps you deconstruct your idea
                into its key assumptions. It’s adapted Business Model Canvas and optimized for Lean
                Startups.
              </p>
            </Col>
          </Row>
        </Grid>
      </Section>
    </Layout.Inner>

    <Section fluid bg="lightgray" spacing="large" indent="large">
      <Layout.Inner>
        <h2 className="text_align_center">Famous business models mapped</h2>
        <SamplesList />
        <div className="text_align_center">
          <Button href="/register">Try for FREE</Button>
        </div>
      </Layout.Inner>
    </Section>

    <Layout.Inner>
      <h2 className="h1 text_align_center">Hall of Fame</h2>
      <Section spacing="small">
        <Grid>
          <Row valign="center">
            <Col xl={3} xlOffset={2} md={3} mdOffset={1} xs={10} xsOffset={1}>
              <p>
                <img src={require('./img/osterwalder.jpg')} alt="Alexander Osterwalder" />
              </p>
            </Col>
            <Col xl={5} md={7} xs={10} xsOffset={1}>
              <h3>Alexander Osterwalder</h3>
              <p>
                Original inventor of Business Model Canvas. He makes popularise it with his
                bestseller book Business Model Generation.
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
                <img src={require('./img/maurya.jpg')} alt="Ash Maurya" />
              </p>
            </Col>
            <Col xl={5} md={7} mdOffset={0} xs={10} xsOffset={1}>
              <h3>Ash Maurya</h3>
              <p>
                Original inventor of Business Model Canvas. He makes popularise it with his
                bestseller book Business Model Generation.
              </p>
            </Col>
          </Row>
        </Grid>
      </Section>
    </Layout.Inner>
  </Layout.Container>
);

export default Landing;

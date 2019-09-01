import React from 'react';
import { Picture } from 'react-responsive-picture';
import Tabs from '../Tabs/Tabs';
import Grid from '../Grid/Grid';

const HowToCanvas = () => (
  <Tabs align="top">
    <Tabs.Pane key="business" icon="segment" tab="Business Model">
      <Grid>
        <Grid.Row valign="center">
          <Grid.Col md={6}>
            <p>
              <Picture alt="Business Model Canvas" src={require('./img/team-work.svg')} />
            </p>
          </Grid.Col>
          <Grid.Col md={6}>
            <h3>Business Model Canvas</h3>
            <p className="text_size_bigger">
              The Business Model Canvas is a great way of mapping out an idea, allowing it to be
              understood, tested and improved.
            </p>
            <p className="text_size_bigger">
              There are no strict rules on how to fill the canvas. Feel free to do it in your own
              way. However, there are some general recommendations that may help you to improve the
              result.
            </p>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col xl={6} xlOffset={3} md={8} mdOffset={2}>
            <h3>Where to start</h3>
            <p>Think about the Business Model Canvas as divided into two large areas:</p>
            <ul>
              <li>the right half represents the part of your business facing the customer</li>
              <li>
                the left half holds everything you need to have or do in order to provide the right
                half
              </li>
            </ul>
            <p>
              We recommend to start with the right half that facing the customer and then move to
              the right.
            </p>

            <h4>Customer</h4>
            <p>
              There are no debts that the customer is a king at any business. That would be a good
              idea to start with an understanding who your customers are. Try to avoid general
              descriptions, like “mass market”. Narrow your audience down as much as you can.
            </p>

            <h4>Value Proposition</h4>
            <p>
              With an understanding of your customers outline your value proposition. Don’t think
              about the features of your product. Think about problems and thing you can offer to
              solve these problems.
            </p>
            <p>To design a better proposition we recommend to use Value Proposition Canvas.</p>

            <h4>Revenue Stream</h4>
            <p>
              It’s important to clearly understand where the money comes from. List your top one to
              three revenue streams from each customer segment. If you do things for free, put them
              here too.
            </p>

            <h4>Channels</h4>
            <p>
              A company can deliver its value proposition to its customers through different
              channels. Effective channels will distribute a company’s value proposition in ways
              that are fast, efficient and cost-effective. Think about your partner’s channels.
            </p>

            <h4>Customer relationships</h4>
            <p>
              Describe in what way you will maintain relationships with your customer. Commonly
              used: personal assistant, self-service, automated services, communities, co-creation.
            </p>
            <br />

            <h3>How the business operates</h3>

            <h4>Key activities</h4>
            <p>
              The most important activities in delivering a company’s value proposition. An example
              for Bic, the pen manufacturer, would be creating an efficient supply chain to drive
              down costs.
            </p>

            <h4>Key resources</h4>
            <p>
              The resources that are necessary to create value for the customer. Don’t list
              everything here, just the essential stuff that is key to your business.
            </p>

            <h4>Key partners</h4>
            <p>
              Not every business has or needs key partners. But it’s worth to think about whether
              partnering with other companies could help you get your business off the ground — you
              don’t need to do everything yourself. A key partner could provide you with a channel
              to reach an existing customer base, create the software you need or help you persuade
              important interest groups.
            </p>

            <h4>Cost structure</h4>
            <p>
              List your top costs by looking at the activities you must perform and the resources
              you required to effectively deliver your products and services.
            </p>
            <br />

            <h3>Review</h3>
            <p>
              Take a step back to check if every customer segment is linked to a value proposition
              and a revenue stream. Make sure everything on the left side of the canvas is needed to
              support the right side of the canvas.
            </p>

            <h4>Checklist</h4>
            <p>
              Think about your business model and rank each of the following questions from 0 to 10:
            </p>
            <ul>
              <li>How scalable is your business model?</li>
              <li>Do you produce recurring revenues?</li>
              <li>Do you earn before you spend?</li>
              <li>How your business model is protected from competitors?</li>
              <li>What work you can delegate to your partners?</li>
            </ul>
            <br />

            ~ It’s the right time to start!
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Tabs.Pane>
    <Tabs.Pane key="value" icon="gift" tab="Value Proposition">
      <Grid>
        <Grid.Row valign="center">
          <Grid.Col md={6}>
            <p>
              <Picture alt="Business Model Canvas" src={require('./img/persona.svg')} />
            </p>
          </Grid.Col>
          <Grid.Col md={6}>
            <h3>Value Proposition Canvas</h3>
            <p className="text_size_bigger">
              The Value Proposition Canvas is a simple way to better understand your customers’
              needs and to design the products and services they want. You can use it on its own,
              but it works even better along with Business Model Canvas where it fits Value
              Proposition and Customer segment sections. We offer to use Peter’s Thomson variation
              of the canvas.
            </p>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col xl={6} xlOffset={3} md={8} mdOffset={2}>
            <h3>Customer</h3>
            <p>
              In the core of the customer section is nuero-lingusitic programming and psychology
              research into motivation and choice architecture. It helps you to build better empathy
              to the customer.
            </p>
            <h4>Customer Segment</h4>
            <p>
              Describe in short words a customer segment you making a canvas for. Try to be as much
              specific as possible.
            </p>

            <h4>Wants</h4>
            <p>
              The emotional drivers of decision making are things that we want to be, do or have.
              Our wants are usually conscious (but aspirational) thoughts about how we’d like to
              improve our lives. They sometimes seem like daydreams but they can be powerful
              motivators of action. The wants to speak more to the pull of our hearts and our
              emotions. I may need a car to get from A to B, but I want a BMW.
            </p>
            <h4>Needs</h4>
            <p>
              The customer’s needs are the rational things that the customer needs to get done.
              Interestingly, needs are not always conscious. Customers can have needs that they may
              not know about yet. Designers call these “latent needs“. The best example is that none
              of us knew that we needed a portable music player until we saw an iPod for the first
              time (we also then suddenly wanted an iPod rather than any other perfectly good music
              player). The needs to speak more to the pull of our heads and rational motivations.
            </p>
            <h4>Fears</h4>
            <p>
              The dark side of making a decision is that it often carries a fear of giving up
              optionality. Fear of making a mistake, fear of missing out, fear of loss and dozens of
              other related fears. Fears can be a strong driver of purchasing behaviour and can be
              the hidden source of wants and needs. Customer fears are often the secret reason that
              no one is buying your widget. For any product, there is a secret “pain of switching“.
              Even if your product is better than the competition, it might not be a big enough
              improvement to overcome the inertia of the status quo.
            </p>
            <br />

            <h3>Proposition</h3>
            <p>
              The right section of the canvas describes a product or service that should correspond
              customer wants, needs and reduce fears.
            </p>
            <h4>Features</h4>
            <p>
              A feature is a factual description of how your product works. The features are the
              functioning attributes of your product. The features also provide the ‘reasons to
              believe’. Many FMCG marketers deride the importance of features because features are
              no longer a point of difference in most FMCG marketing. But for technology products
              and innovative new services the features on offer can still be an important part of
              your value proposition.
            </p>
            <h4>Benefits</h4>
            <p>
              A benefit is what your product does for the customer. The benefits are the ways that
              the features make your customer’s life easier by increasing pleasure or decreasing
              pain. The benefits of your product really are the core of your value proposition. The
              best way to list out the benefits of your product on the canvas is to imagine all the
              ways that your product makes your customer’s life better.
            </p>
            <h4>Experience</h4>
            <p>
              The product experience is the way that owning your product makes the customer feel.
              It’s the sum total of the combined features and benefits. Product experience is
              different from features and benefits because it’s more about the emotional reasons why
              people buy your product and what it means for them in their own lives. The product
              experience is the kernel that will help identify the market positioning and brand
              essence that is usually built out of the value proposition.
            </p>
            <h4>Substitutes</h4>
            <p>
              Some companies claim that they have no direct competitors. The substitutes on the
              canvas aren’t just the obvious competitors, instead look for the existing behaviours
              and coping mechanisms. This is on the canvas because it shocks us into remembering
              that our customers are real people with daily lives who have made it this far in life
              without our product. No matter how much better your product is than the competition,
              if it isn’t better than the existing solutions then you don’t have a real-world value
              proposition.
            </p>
            <br />

            <h3>Checklist</h3>
            <ul>
              <li>Only one customer persona/segment per canvas.</li>
              <li>At least 5 points in every customer segment.</li>
              <li>What points is still an assumption?</li>
              <li>
                Product part strictly corresponded to customers wants, needs and resolve fears.
              </li>
            </ul>
            <br />

            ~ Let’s make it happened!
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Tabs.Pane>
    <Tabs.Pane key="lean" icon="lean" tab="Lean Canvas">
      <Grid>
        <Grid.Row valign="center">
          <Grid.Col md={6}>
            <p>
              <Picture alt="Business Model Canvas" src={require('./img/looking-for-idea.svg')} />
            </p>
          </Grid.Col>
          <Grid.Col md={6}>
            <h3>Lean Canvas</h3>
            <p className="text_size_bigger">
              The Lean Canvas is a version of the Business Model Canvas adopted for Lean Startup
              methodology by Ash Maurya. It put your focus on important thing you should care about
              when you launch a new business: who’s your customers, what problems you trying to
              solve, what is your KPI’s to understand the success, how you stand out from
              competitors, etc.
            </p>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col xl={6} xlOffset={3} md={8} mdOffset={2}>
            <h3>How to fill the canvas</h3>
            <p>Similar to Business Model canvas you can break Lean Canvas into two large areas:</p>
            <ul>
              <li>the right half represents your market</li>
              <li>the left half represents your product</li>
            </ul>
            <p>
              We recommend starting any business from identifying problems and description of your
              customer and then move on to the product part.
            </p>
            <br />

            <h4>Problem</h4>
            <p>
              Each customer segment you are thinking to work with will have a set of problems that
              they need solving. In this box try listing the one to three high priority problems
              that your customer has. Without a problem to solve, you don’t have anything to offer.
            </p>
            <p>
              <b>Existing alternatives.</b> Describe how these problems customers solve now. Think
              about all alternatives exists, e.g. for taxi service it could be a walk or a bike.
            </p>

            <h4>Customer Segments</h4>
            <p>
              Without a customer there is no problem to solve and visa-versa. Describe your customer
              segment as much detail as you can. Avoid general description, like “mass market”.
            </p>
            <p>
              <b>Early adopters.</b> Who are those people who will be first in line to try your
              product/service? Usually, this is customers with biggest pain from problems you are
              trying to solve.
            </p>

            <h4>Unique Value Proposition</h4>
            <p>
              The Unique Value Proposition should be a single clear compelling message that captures
              the essence of your product and the solutions it offers your customer with respect to
              the problems you are trying to solve.
            </p>
            <p>
              <b>A High-Level Concept</b> is a one-sentence pitch. Describe your product in terms of
              others in existence that are widely known and well-established. Here are examples:
              “Flickr for video.” (YouTube), “Friendster for dogs.” (Dogster)
            </p>

            <h4>Solution</h4>
            <p>
              Define the top three features and capabilities your product or service offers to solve
              your customers’ problems. Most likely your solution will change with a better
              understanding of your customers. This is a part of the Lean Startup life cycle Build —
              Measure — Learn.
            </p>

            <h4>Channels</h4>
            <p>
              This section describes the way you are going to reach your customers. What is your
              “touchpoints” with a customer? It’s important to understand how your customers will
              know about your solution to their problems, how you deliver this solution and how you
              communicate before and after the purchase with your customers. At the initial stage
              try not to think about scale but focus on learning.
            </p>

            <h4>Revenue Streams</h4>
            <p>
              Describe sources of revenue you have. If it’s subscription, describe the way you bill.
              If you serve something for the free list it out here as well. But remember proposing
              something for free is a lot different than getting paid from them.
            </p>

            <h4>Cost Structure</h4>
            <p>
              List all costs of doing your business. Don’t forget customer acquisition costs,
              distribution costs, payment processing fees, etc. Look at your canvas and think how
              each section can drive your costs.
            </p>

            <h4>Key Metrics</h4>
            <p>
              You need to clearly understand the way you measure the health of your business. It
              much depends on the industry and business model you have. Also, it’s good practice to
              choose one North-star metric for your business.
            </p>

            <h4>Unfair Advantage</h4>
            <p>
              This is the most difficult to block to answer. The only real competitive advantage is
              that which cannot be copied and cannot be bought – Jason Cohen says. It could be
              inside information, personal authority, community, a dream team, reputation, etc.
            </p>
            <br />

            <h3>Build — Measure — Learn</h3>
            <p>
              Never forget that when you running lean there is nothing permanent. The golden cycle
              of running lean never stops. All the assumptions you’ve made should be tested on as
              soon as it’s possible in the wild. Get to the market fast, learn fast and you’ll be
              unbeatable.
            </p>
            <br />

            ~ Bazinga!
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Tabs.Pane>
  </Tabs>
);

export default HowToCanvas;

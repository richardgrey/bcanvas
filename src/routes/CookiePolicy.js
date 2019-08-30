import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PageTitle from '../components/PageTitle/PageTitle';

class CookiePolicy extends Component {
  render() {
    return (
      <Layout type="static-page">
        <Layout.Header>
          <Header btnBack btnUser />
        </Layout.Header>
        <Layout.Container>
          <Layout.Inner>
            <PageTitle title="Cookie Policy" />
            <h4>What are cookies?</h4>
            <p>
              A cookie is a text file stored in a user’s web browser on any device they use to
              access a website that holds information regarding the user’s visit, such as
              preferences. When the user returns, the browser provides the cookie with the stored
              information to the site.
            </p>
            <h2>What cookies are used for?</h2>
            <p>
              Cookies are used for adjusting a website’s content to fit a user’s preferences and
              optimize the website. They store useful information that improve the user’s experience
              experience of a website. They are most commonly used for:
            </p>
            <ul>
              <li>
                Storing login information so that a user does not need to re-login on every visit.
              </li>
              <li>
                Recognizing the type of device a user is browsing with and any preferences applied
                to optimize the website specifically for the device.
              </li>
              <li>
                Creating statistics that help website owners to understand how their users interact
                with their website, which allows them to improve their structure and content.
              </li>
            </ul>
            <h4>What types of cookies are used?</h4>
            <p>
              There are two types of cookies: persistent cookies and session cookies. Persistent
              cookies remain on your hard drive for a period of time specified in the cookie’s file
              parameters or until removed manually. When you return to a website and it requires you
              to login again despite previously storing your login information, it is usually
              because the persistent cookie expired; this helps to increase security while
              maintaining accessibility.
            </p>
            <p>
              Session cookies, on the other hand, are used temporarily and expire once the website
              or browser is closed. They are used to track user activity on a website during a
              single visit. When a website requires that you verify your age or location once every
              visit before allowing you to view content and without requiring additional personal
              details, that is a session cookie at work.
            </p>
            <h4>Do cookies include personal data?</h4>
            <p>
              If there is a need for the collection of personal information, such as for creating
              accounts, then cookies may store personal information. However, it is required by data
              protection law that users are informed of the collection of personal data. This data
              will also be encrypted to render it inaccessible for unauthorized users.
            </p>
            <h4>Managing cookies</h4>
            <p>
              By default, browsers are configured to accept cookies. However, these settings may be
              changed to block cookies entirely, or to inform the user each time they are used.
              Detailed information about cookies and the options associated with them are available
              in each browsers’ settings.
            </p>
          </Layout.Inner>
        </Layout.Container>
      </Layout>
    );
  }
}

export default CookiePolicy;

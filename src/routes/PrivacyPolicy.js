import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PageTitle from '../components/PageTitle/PageTitle';

class PrivacyPolicy extends Component {
  render() {
    return (
      <Layout type="static-page">
        <Layout.Header>
          <Header btnBack btnUser />
        </Layout.Header>
        <Layout.Container>
          <Layout.Inner>
            <PageTitle title="Privacy Policy" />
            <p>
              At BCanvas, accessible from https://bcanvas.io, one of our main priorities is the
              privacy of our visitors. This Privacy Policy document contains types of information
              that is collected and recorded by BCanvas.io and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy,
              do not hesitate to contact us through email at
              su&#112;&#112;&#111;rt&#64;&#98;&#99;anvas.io
            </p>

            <h4>General Data Protection Regulation (GDPR)</h4>

            <p>Data Controller of your information.</p>
            <p>
              BCanvas.io legal basis for collecting and using the personal information described in
              this Privacy Policy depends on the Personal Information we collect and the specific
              context in which we collect the information:
            </p>
            <ul>
              <li>BCanvas.io needs to perform a contract with you</li>
              <li>You have given BCanvas.io permission to do so</li>
              <li>Processing your personal information is in BCanvas.io legitimate interests</li>
              <li>BCanvas.io needs to comply with the law</li>
            </ul>
            <p>
              BCanvas.io will retain your personal information only for as long as is necessary for
              the purposes set out in this Privacy Policy. We will retain and use your information
              to the extent necessary to comply with our legal obligations, resolve disputes, and
              enforce our policies.
            </p>
            <p>
              If you are a resident of the European Economic Area (EEA), you have certain data
              protection rights. If you wish to be informed what Personal Information we hold about
              you and if you want it to be removed from our systems, please contact us.
            </p>
            <p>In certain circumstances, you have the following data protection rights:</p>
            <ul>
              <li>The right to access, update or to delete the information we have on you.</li>
              <li>The right of rectification.</li>
              <li>The right to object.</li>
              <li>The right of restriction.</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <h4>Log Files</h4>
            <p>
              BCanvas.io follows a standard procedure of using log files. These files log visitors
              when they visit websites. All hosting companies do this and a part of hosting
              services’ analytics. The information collected by log files include internet protocol
              (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp,
              referring/exit pages, and possibly the number of clicks. These are not linked to any
              information that is personally identifiable. The purpose of the information is for
              analyzing trends, administering the site, tracking users’ movement on the website, and
              gathering demographic information.
            </p>
            <h4>Cookies and Web Beacons</h4>
            <p>
              Like any other website, BCanvas.io uses “cookies”. These cookies are used to store
              information including visitors’ preferences, and the pages on the website that the
              visitor accessed or visited. The information is used to optimize the users’ experience
              by customizing our web page content based on visitors’ browser type and/or other
              information.
            </p>
            <h4>Privacy Policies</h4>
            <p>
              You may consult this list to find the Privacy Policy for each of the advertising
              partners of BCanvas.io.
            </p>
            <p>
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or
              Web Beacons that are used in their respective advertisements and links that appear on
              BCanvas.io, which are sent directly to users’ browser. They automatically receive your
              IP address when this occurs. These technologies are used to measure the effectiveness
              of their advertising campaigns and/or to personalize the advertising content that you
              see on websites that you visit.
            </p>
            <p>
              Note that BCanvas.io has no access to or control over these cookies that are used by
              third-party advertisers.
            </p>
            <h4>Third Pary Privacy Policies</h4>
            <p>
              BCanvas’s Privacy Policy does not apply to other advertisers or websites. Thus, we are
              advising you to consult the respective Privacy Policies of these third-party ad
              servers for more detailed information. It may include their practices and instructions
              about how to opt-out of certain options. You may find a complete list of these Privacy
              Policies and their links here: Privacy Policy Links.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. To know
              more detailed information about cookie management with specific web browsers, it can
              be found at the browsers’ respective websites. What Are Cookies?
            </p>
            <h4>Children’s Information</h4>
            <p>
              Another part of our priority is adding protection for children while using the
              internet. We encourage parents and guardians to observe, participate in, and/or
              monitor and guide their online activity.
            </p>
            <p>
              BCanvas.io does not knowingly collect any Personal Identifiable Information from
              children under the age of 13. If you think that your child provided this kind of
              information on our website, we strongly encourage you to contact us immediately and we
              will do our best efforts to promptly remove such information from our records.
            </p>
            <h4>Online Privacy Policy Only</h4>
            <p>
              This privacy policy (
              <a href="https://gdprprivacynotice.com">
                GDPR Privacy Policy created at GDPRPrivacyNotice.com
              </a>
              ) applies only to our online activities and is valid for visitors to our website with
              regards to the information that they shared and/or collect in BCanvas.io. This policy
              is not applicable to any information collected offline or via channels other than this
              website.
            </p>
            <h4>Consent</h4>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </Layout.Inner>
        </Layout.Container>
      </Layout>
    );
  }
}

export default PrivacyPolicy;

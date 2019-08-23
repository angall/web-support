/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="JazzVPN" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <img src={`${baseUrl}img/JazzVPN_logo.svg`} alt="JazzVPN" />
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/undraw_connected_world_wuay.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('qsetup')}>Try It Now</Button>
            <Button href={docUrl('qsetup')}>Get started</Button>
            <Button href={docUrl('doc2.html')}>Read the docs</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Features</h2>
        <MarkdownBlock>**JazzVPN** allows access to remote computers and networks using Internet to create a wider private network. It's like a Cisco VPN router but with all the flexibility you get in software. 
          It's like OpenVPN in a simple, easy to use box that runs on Windows and hopefuly soon in Mac OS X and Linux as well. 
        </MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              'Leverage your **JazzVPN** implementation using [**Python**](https://www.python.com). ' +
              'You can finely control login logic, create custom made login dialogs, and change ' +
              'execution curse on crucial steps. Check our post for [**DUO**](https://www.duo.com) login '+
              'implemented in Python. Or IP based connection allowance. Or corporate password control. You name it, possibilities are infinite.\n\n'+
              '[**Check in the blog these and other examples**](https://www.duo.com)',
            image: `${baseUrl}img/undraw_code_typing_7jnv.svg`,
            imageAlign: 'right',
            title: 'Developers friendly',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              '**JazzVPN** was designed with the idea in mind that a good VPN solution should be created around three main spots: '+
              'Secure user autenthication, which means that the user actualy is the person it claims to be; '+
              'secure transport to make sure that no one will ever be able to peek into your data; and auditory to be sure that '+
              'if something gets ever wrong you can certainly know what happened and be able to fix it.\n\n**JazzVPN** supports two levels '+
              'of network auditory: all packet headers capture or all packets capture (header and body) for specific users or for all of them.',
            image: `${baseUrl}img/undraw_security_o890.svg`,
            imageAlign: 'left',
            title: 'Tight control over connections',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              '**JazzVPN** was designed to be easy to use: a simple setup without compromising security or functionality. '+
              'Relying on regular HTTPS logic, using TLS 1.3 protocols and current standards in certificate validation,'+
              ' it\'s easy to keep a tighter security than most current home banking solutions. \n\n'+
              'Use integrated [**Let\'s Encrypt**](https:\\www.letsencrypt.org) certificate generation and a'+
              ' complementary connection address under jazzvpn.cc domain to have a working solution in a breeze.' ,
            image: `${baseUrl}img/undraw_setup_wizard_r6mr.svg`,
            imageAlign: 'right',
            title: 'Up and running in no time',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'Straight login from AD into JazzVPN ',
            image: `${baseUrl}img/azure-active-directory.svg`,
            imageAlign: 'top',
            title: 'Active Directory',
          },
          {
            content: 'Use profiles to control what each user can see in your network',
            image: `${baseUrl}img/ic_account_box_48px.svg`,
            imageAlign: 'top',
            title: 'Profiles',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <LearnHow />
          <Description />
          <TryOut />
        </div>
      </div>
    );
  }
}

module.exports = Index;

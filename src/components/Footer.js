/* @flow */

import React, { Component } from 'react';

// semantic-ui
import { Image, Icon } from 'semantic-ui-react';

// images
import urLogo from "../images/ur-logo.png";

import { Link } from "react-router-dom";

const LinkIcon = (props: Object) => {
  const { icon, href, alt, target } = props;
  return (
    <a
      className="lsf-app-footer-link"
      alt={alt}
      href={href}
      target={target}
    >
      <Icon
        className="lsf-app-footer-icon"
        name={icon}
        size='big'
      />
    </a>
  );
}

const ReactRouterLinkIcon = (props: Object) => {
  const { icon, href, alt, target } = props;
  return (
    <Link
      className="lsf-app-footer-link"
      alt={alt}
      to={href}
      >
         <Icon
        className="lsf-app-footer-icon"
        name={icon}
        size='big'
      />
      </Link>
  )
}

// TODO make copyright a static page
const Footer = (props: Object) => {
  return (
    <div className="lsf-app-footer-container">
      <footer className="lsf-app-footer">
        <Image
          className='lsf-app-footer-link lsf-app-footer-image'
          id="lsf-app-footer-image-ur"
          src={urLogo}
          alt='University of Rochester Link'
          size='medium'
          href='https://rochester.edu'
          target='_blank'
        />
        <LinkIcon
          alt='iOS App Store Link'
          href='https://itunes.apple.com/us/app/asl-lsf/id1325129354?ls=1&mt=8'
          icon='app store ios'
          target="_blank"
        />
        <LinkIcon
          alt='Google Play Link'
          href='https://play.google.com/store/apps/details?id=com.lsfapp&hl=en'
          icon='google play'
          target="_blank"
        />
        <LinkIcon
          alt='E-Mail'
          href='mailto:lsfaslrochester@gmail.com'
          icon='mail'
          target="_blank"
        />
        <ReactRouterLinkIcon
          alt='Copyright'
          href='/copyright'
          icon='copyright'
          target="_self"
        />
      </footer>
    </div>
  );
}

export default Footer;

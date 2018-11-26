/* @flow */

import React, { Component } from 'react';

// semantic ui
import { Segment, Divider } from 'semantic-ui-react';

// Components
import VideoPlayer from './VideoPlayer';
export default class Intro extends Component {
  constructor(props: Object) {
    super(props);
    this.getVideo = this.getVideo.bind(this);
  }

  getVideo(): Array<String> {
    const { shortcode } = this.props;
    const re = /mp4="(.*?)"/g;
    return re.exec(shortcode)[1];
  }
  render() {
    const { title } = this.props;
    return(
      <Segment className="lsf-app-intro-container">
        <h1 className="lsf-static-page-title">{title}</h1>
        <Divider horizontal/>
        <VideoPlayer
          className="intro-video"
          src={this.getVideo()}
        />
      </Segment>
    );
  }
}

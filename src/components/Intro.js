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

  getCaptions(): Array<String> {
    const { shortcode } = this.props;
    const re = /href="(.*?)"/g;
    const res = re.exec(shortcode);
    if (res !== null) return res[1];
  }

  render() {
    const { title } = this.props;
    return(
      <Segment className="lsf-app-intro-container lsf-app-body">
        <Divider horizontal/>
        <VideoPlayer
          className="intro-video"
          captions={this.getCaptions()}
          src={this.getVideo()}
        />
      </Segment>
    );
  }
}

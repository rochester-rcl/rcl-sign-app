/* @flow */

// React
import React, { Component } from 'react';

// semantic ui
import { Segment } from 'semantic-ui-react';

export default class Timeline extends Component {
  constructor(props: Object) {
    super(props);
    this.initTimeline = this.initTimeline.bind(this);
  }

  componentDidMount() {
    this.initTimeline();
  }

  initTimeline() {
    const url = Timeline.parseTimelineSrcFromShortcode(this.props.src);
    this.timeline = new window.TL.Timeline(this.timelineDOM, url);
  }

  static parseTimelineSrcFromShortcode(shortcode: string) {
    const re = /src="(.*?)"/g;
    return re.exec(shortcode)[1];
  }

  render() {
    return (
      <Segment className="lsf-timeline-container">
        <div ref={ ref => this.timelineDOM = ref } className="lsf-timeline-embed"></div>
      </Segment>
    );
  }
}

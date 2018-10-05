/* @flow */
import React, { Component } from 'react';

// semantic ui
import {Segment, Dimmer, Loader} from 'semantic-ui-react';

const Loading = (props: Object) => {
  const { text, page } = props;
  if (page === true) {
    return(
      <Segment className="lsf-loader-container">
        <Dimmer inverted page active className="lsf-loader-dimmer">
          <Loader inverted size="massive" className="lsf-loader">{text}</Loader>
        </Dimmer>
      </Segment>
    );
  } else {
    return (
        <Loader active size="massive" inline="centered" className="lsf-loader">{text}</Loader>
    )
  }

}

export default Loading;

/* @flow */
import React, { Component, Fragment } from 'react';

// semantic ui
import { Segment, Divider, Header } from 'semantic-ui-react';

const StaticPage = (props: Object) => {
  const { content, title } = props;
  return(
    <Segment className="lsf-static-page-container lsf-app-body">
      <Divider horizontal/>
      <div className="lsf-static-page-content" dangerouslySetInnerHTML={{__html: content}} />
    </Segment>
  );
};

export default StaticPage;

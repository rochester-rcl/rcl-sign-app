/* @flow */

// React
import React, { Component } from 'react';

// React Native

import {
  Card,
  Button,
  Icon,
  Flag
} from 'semantic-ui-react';


  const DefinitionDisplay = (props: Object) => {
    const { engDefinition, frDefinition, toggleModal } = props;
    const selectVideos = () => {
      toggleModal({en: engDefinition, fr: frDefinition}, true);
    }
    if (props.currentLanguage === 'en') {
      return(
        <Card
          onClick={selectVideos}
          color='blue'>
          <Card.Content>
            <Card.Header>
            {engDefinition.title + ' / ' + frDefinition.title}
            </Card.Header>
          </Card.Content>
        </Card>

      );
    } else {
      return(

        <Card
          onClick={selectVideos}
          color='violet'>
          <Card.Content>
            <Card.Header>
            {frDefinition.title + ' / ' + engDefinition.title}
            </Card.Header>
          </Card.Content>
        </Card>

      );
    }
  }

  export default DefinitionDisplay;

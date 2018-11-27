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
    const mainDefinition = (props.currentLanguage === 'en') ? engDefinition.title : frDefinition.title;
    const secondaryDefinition = (props.currentLanguage === 'en') ? frDefinition.title : engDefinition.title;
    const selectVideos = () => {
      toggleModal({en: engDefinition, fr: frDefinition}, true);
    }
    return(
      <div className="lsf-etymology-term" onClick={selectVideos}>
        <h3 className="lsf-etymology-term-title">
          {mainDefinition + ' / ' + secondaryDefinition}
        </h3>
      </div>
    );
  }

  export default DefinitionDisplay;

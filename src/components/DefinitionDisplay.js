/* @flow */

// React
import React, { Component } from 'react';

// React Native
/*
import {
  Text,
  View,
  Image,
  TouchableOpacity } from 'react-native';
*/
// Styles
import { DefinitionDisplayStyles } from '../styles/Styles';

  const DefinitionDisplay = (props: Object) => {
    const { engDefinition, frDefinition, toggleModal } = props;
    const selectVideos = () => {
      toggleModal({en: engDefinition, fr: frDefinition}, true);
    }
    if (props.currentLanguage === 'en') {
      return(
        <div>
          <button onPress={selectVideos}>
            <DefinitionDisplayStyles variant={{ definition: true }}>{engDefinition.title + ' / ' + frDefinition.title}</DefinitionDisplayStyles>
          </button>
        </div>
      );
    } else {
      return(
        <div>
          <button onPress={selectVideos}>
            <DefinitionDisplayStyles variant={{ definition: true }}>{frDefinition.title + ' / ' + engDefinition.title}</DefinitionDisplayStyles>
          </button>
        </div>
      );
    }
  }

  export default DefinitionDisplay;

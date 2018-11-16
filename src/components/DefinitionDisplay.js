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
          <button onClick={selectVideos}>
            <div>{engDefinition.title + ' / ' + frDefinition.title}</div>
          </button>
        </div>
      );
    } else {
      return(
        <div>
          <button onClick={selectVideos}>
            <div>{frDefinition.title + ' / ' + engDefinition.title}</div>
          </button>
        </div>
      );
    }
  }

  export default DefinitionDisplay;

/* @flow */

// React
import React, { Component } from 'react';

// React Native
import {
  Text,
  View,
  Image,
  TouchableOpacity } from 'react-native';

// Styles
import { DefinitionDisplayStyles } from '../styles/Styles';

  const DefinitionDisplay = (props: Object) => {
    const { engDefinition, frDefinition, toggleModal } = props;
    const selectVideos = () => {
      toggleModal({en: engDefinition, fr: frDefinition}, true);
    }
    if (props.currentLanguage === 'en') {
      return(
        <View>
          <TouchableOpacity onPress={selectVideos}>
            <Text style={DefinitionDisplayStyles.definition}>{engDefinition.title + ' / ' + frDefinition.title}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return(
        <View>
          <TouchableOpacity onPress={selectVideos}>
            <Text style={DefinitionDisplayStyles.definition}>{frDefinition.title + ' / ' + engDefinition.title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  export default DefinitionDisplay;

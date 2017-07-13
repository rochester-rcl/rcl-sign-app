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
      let enUrl = engDefinition.video_url[0];
      let frUrl = frDefinition.video_url[0];
      toggleModal({en: enUrl, fr: frUrl}, true);
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
          <TouchableOpacity>
            <Text style={DefinitionDisplayStyles.definition}>{frDefinition.title + ' / ' + engDefinition.title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  export default DefinitionDisplay;

// React
import React, {Component} from 'react';

// React Native
import {Text, View} from 'react-native';

// Styles
import {VideoStyles} from '../styles/Styles';

export default VideoCaptions = props => {
  const {captions, show} = props;
  if (captions && show) {
    return (
      <View style={VideoStyles.captionsContainer}>
        <Text style={VideoStyles.captions}>{captions}</Text>
      </View>
    );
  }
  return null;
};

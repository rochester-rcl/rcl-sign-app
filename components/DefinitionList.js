/* @flow */

// React
import React, { Component } from 'react';

// React Native
import { Text, View, ListView } from 'react-native';

// Styles
import { DefinitionListStyles } from '../styles/Styles';

export default class DefinitionList extends Component {
  render() {
    return(
      <View style={DefinitionListStyles.definitionListContainer}>
        <Text style={{color: '#fff'}}>List content goes here with a ListView</Text>
      </View>
    );
  }
}

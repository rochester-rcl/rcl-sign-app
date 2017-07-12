/* @flow */

// React
import React, { Component } from 'react';

// React Native
import { Text,
         View,
         ListView,
         ActivityIndicator } from 'react-native';

// Styles
import { DefinitionListStyles, DefinitionDisplayStyles } from '../styles/Styles';

// Components
import DefinitionDisplay from './DefinitionDisplay';

export default class DefinitionList extends Component {
  constructor(props: Object) {
    super(props);
    this.definitionData = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }
  render() {
    const { definitions, currentLanguage, fetchingDefinitions } = this.props;
    if (definitions.length > 0 && !fetchingDefinitions) {
    return(
      <View style={DefinitionListStyles.definitionListContainer}>
        <ListView
          dataSource={this.definitionData.cloneWithRows(definitions)}
          renderRow={(data) =>
            <DefinitionDisplay
              engDefinition={data.eng_definition}
              frDefinition={data.fr_definition}
              currentLanguage={this.props.currentLanguage}
            />
          }
        />
      </View>
    );
  } else if (definitions.hasOwnProperty('error')) {
    return (
      <View style={DefinitionListStyles.definitionListContainer}>
        <Text style={DefinitionDisplayStyles.errorMessage}>{definitions.message}</Text>
      </View>
    );
  } else {
      return(
        <View style={DefinitionListStyles.definitionListContainer}>
          <ActivityIndicator
            animating={true}
            style={{top: 100}}
            size="large"
            color='#4286f4'
          />
        </View>
      );
    }
  }
}

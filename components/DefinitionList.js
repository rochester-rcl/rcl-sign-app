/* @flow */

// React
import React, {Component} from 'react';

// React Native
import {Text, View, FlatList, ActivityIndicator} from 'react-native';

// Styles
import {DefinitionListStyles, DefinitionDisplayStyles} from '../styles/Styles';

// Components
import DefinitionDisplay from './DefinitionDisplay';

export default class DefinitionList extends Component {
  constructor(props: Object) {
    super(props);
  }
  render() {
    const {
      definitions,
      currentLanguage,
      fetchingDefinitions,
      searchResults,
      toggleModal,
    } = this.props;

    const searchResultMessage = () => {
      if (currentLanguage === 'en') return definitions.length + ' Results';
      return definitions.length + ' Résultat';
    };
    if (definitions.length > 0 && !fetchingDefinitions) {
      if (searchResults) {
        return (
          <View style={DefinitionListStyles.definitionListContainer}>
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: 15,
                marginTop: 15
              }}>
              {searchResultMessage()}
            </Text>
            <FlatList
              data={definitions}
              renderItem={({item}) => (
                <DefinitionDisplay
                  engDefinition={item.engDefinition}
                  frDefinition={item.frDefinition}
                  currentLanguage={currentLanguage}
                  toggleModal={toggleModal}
                />
              )}
              keyExtractor={item => item.engDefinition.definitionId.toString()}
            />
          </View>
        );
      } else {
        return (
          <View style={DefinitionListStyles.definitionListContainer}>
            <FlatList
              data={definitions}
              renderItem={({item}) => (
                <DefinitionDisplay
                  engDefinition={item.engDefinition}
                  frDefinition={item.frDefinition}
                  currentLanguage={currentLanguage}
                  toggleModal={toggleModal}
                />
              )}
              keyExtractor={item =>
                item.engDefinition.definitionId.toString()
              }
            />
          </View>
        );
      }
    } else if (definitions.hasOwnProperty('error') && !fetchingDefinitions) {
      return (
        <View style={DefinitionListStyles.definitionListContainer}>
          <Text style={DefinitionDisplayStyles.errorMessage}>
            {definitions.message}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={DefinitionListStyles.definitionListContainer}>
          <ActivityIndicator
            animating={true}
            style={{top: 100}}
            size="large"
            color="#4286f4"
          />
        </View>
      );
    }
  }
}

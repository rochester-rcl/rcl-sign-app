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
  constructor(props) {
    super(props);
    this.renderDefinitions = this.renderDefinitions.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.renderActivity = this.renderActivity.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
    this.renderAll = this.renderAll.bind(this);
  }

  renderDefinitions(key) {
    const {
      definitions,
      fetchingDefinitions,
      currentLanguage,
      toggleModal,
      layoutAspect,
    } = this.props;
    const listContainerStyle =
      layoutAspect === 'LAYOUT_PORTRAIT'
        ? DefinitionListStyles.definitionListContainer
        : DefinitionListStyles.definitionListContainerLandscape;
    if (definitions.length > 0 && !fetchingDefinitions) {
      return (
        <View key={key} style={listContainerStyle}>
          <FlatList
            data={definitions}
            renderItem={({item}) => (
              <DefinitionDisplay
                engDefinition={item.en}
                frDefinition={item.fr}
                currentLanguage={currentLanguage}
                toggleModal={toggleModal}
              />
            )}
            keyExtractor={item => item.en.definitionId.toString()}
          />
        </View>
      );
    }
    return null;
  }

  renderSearchResults(key) {
    const {searchResults, currentLanguage, definitions} = this.props;
    if (searchResults) {
      const message = `${definitions.length} ${
        currentLanguage === 'en' ? 'Results' : 'Résultat'
      }`;
      return (
        <Text
          key={key}
          style={{
            alignSelf: 'center',
            marginBottom: 15,
            marginTop: 15,
          }}>
          {message}
        </Text>
      );
    }
    return null;
  }

  renderActivity(key) {
    const {fetchingDefinitions} = this.props;
    if (fetchingDefinitions) {
      return (
        <ActivityIndicator
          key={key}
          animating={true}
          style={{alignSelf: 'center', flex: 1}}
          size="large"
          color="#4286f4"
        />
      );
    }
  }

  renderStatus(key) {
    const {definitions, fetchingDefinitions} = this.props;
    if (!definitions.length && !fetchingDefinitions) {
      return (
        <Text key={key} style={DefinitionDisplayStyles.errorMessage}>
          {definitions.message}
        </Text>
      );
    }
    return null;
  }

  renderAll() {
    return [
      this.renderSearchResults,
      this.renderDefinitions,
      this.renderStatus,
      this.renderActivity,
    ].map((func, index) => func(index));
  }

  render() {
    return (
      <View style={DefinitionListStyles.definitionListContainer}>
        {this.renderAll()}
      </View>
    );
  }
}

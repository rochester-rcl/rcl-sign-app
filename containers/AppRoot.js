/* @flow */

// React
import React, { Component } from 'react';

// React Native
import { Text, View } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as AppActions from '../actions/Actions';

// Styles
import GlobalStyles from '../styles/Styles';

// Components
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';
import DefinitionList from '../components/DefinitionList';
import VideoModal from '../components/VideoModal';

class AppRoot extends Component {
  constructor(props: Object) {
    super(props);
    // Bind all methods to 'this' context here
    (this: any).setAppLanguage = this.setAppLanguage.bind(this);
    (this: any).loadDefinitions = this.loadDefinitions.bind(this);
    (this: any).flushDefinitionsCache = this.flushDefinitionsCache.bind(this);
  }

  componentWillMount() {
    // Get our first batch of definitions - we can load this with a default value
    let definitionQuery = {
      language: this.props.language, // defaults to English
      letter: 'a',
      range: 'a-g',
    }
    this.props.loadDefinitionsAction(definitionQuery);
  }

  loadDefinitions(definitionQuery: Object, clearCache: boolean) {
    let { range } = definitionQuery;
    let { definitionsCache } = this.props;
    if (clearCache) {
      this.flushDefinitionsCache(this.props.loadDefinitionsAction(definitionQuery));
    } else {
      if (this.props.definitionsCache.hasOwnProperty(range)) {
        this.props.loadDefinitionsFromCacheAction(definitionsCache[range]);
      } else {
        this.props.loadDefinitionsAction(definitionQuery);
      }
    }
  }

  flushDefinitionsCache(callbackAction: Object): typeof Promise {
    this.props.flushDefinitionsCacheAction(callbackAction);
  }

  setAppLanguage(language) {
    this.props.setAppLanguageAction(language);
  }

  render() {
    const {
      definitions,
      language,
      loadDefinitionsAction,
      definitionsCache,
      fetchingDefinitions,
      videoModal,
      toggleVideoModalAction
    } = this.props;

    // All of our 'dumb' components will be rendered as children here.
    return(
      <View style={GlobalStyles.container}>
        <Banner language={language} setLanguage={this.setAppLanguage}/>
        <Navigation
          language={language}
          loadDefinitions={this.loadDefinitions}
          flushDefinitionsCache={this.flushDefinitionsCache}
        />
        <DefinitionList
          currentLanguage={language}
          definitions={definitions}
          fetchingDefinitions={fetchingDefinitions}
          toggleModal={toggleVideoModalAction}
        />
        <VideoModal
          videoModalContent={videoModal}
          language={language}
          displayModal={videoModal.display}
          toggleModal={toggleVideoModalAction}
        />
      </View>
    );
  }
}

/*
* Function that returns all branches of the state tree we want this container to subscribe to
* Called every time the state is updated, these results get merged into the container's props
* i.e this.props.definitions = state.definitions. Passed as an argument to connect()
*
*@param {Object} state - the Redux state set up in Reducer.js
*@return {Object}
*/
function mapStateToProps(state): Object {
  return {
    definitions: state.definitions,
    language: state.language,
    definitionsCache: state.definitionsCache,
    fetchingDefinitions: state.fetchingDefinitions,
    videoModal: state.videoModal,
  }
}

/*
* Function that merges all of our action creators from Actions.js with the container's props.
* All of the functions contained in AppActions are wrapped in a dispatch() call so we can dispatch
* an action like this: 'this.props.loadDefinitionsAction(definitionQuery)'. Closes over the AppActions
* imported at the top of the file and returns bindActionCreators, which is the function that actually
* wraps all action creators in a dispatch call.
*
*@param {Function} dispatch
*@return {Function} bindActionCreators
*/
function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(AppRoot);

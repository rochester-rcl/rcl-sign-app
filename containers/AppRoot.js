/* @flow */

// React
import React, {Component, createContext} from 'react';

// React Native
import {
  Text,
  View,
  Platform,
  UIManager,
  Keyboard,
  LayoutAnimation,
} from 'react-native';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Actions
import * as AppActions from '../actions/Actions';
import * as DownloadActions from '../actions/DownloadActions';

// Styles
import GlobalStyles from '../styles/Styles';

// Components
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';
import DefinitionList from '../components/DefinitionList';
import VideoModal from '../components/VideoModal';

// Constants
import {createDefinitionsCacheKey} from '../utils/Constants';

// Context
import {OfflineDownloadContext} from '../components/OfflineDownload';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const fadeInOut = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

class AppRoot extends Component {
  LAYOUT_PORTRAIT = 'LAYOUT_PORTRAIT';
  LAYOUT_LANDSCAPE = 'LAYOUT_LANDSCAPE';
  state = {showIntroScreen: false, portraitKeyboardActive: false};
  constructor(props) {
    super(props);
    this.setAppLanguage = this.setAppLanguage.bind(this);
    this.toggleIntroScreen = this.toggleIntroScreen.bind(this);
    this.loadDefinitions = this.loadDefinitions.bind(this);
    this.flushDefinitionsCache = this.flushDefinitionsCache.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleKeyboardShow = this.handleKeyboardShow.bind(this);
    this.handleKeyboardHide = this.handleKeyboardHide.bind(this);
    this.keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardShow,
    );
    this.keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardHide,
    );
  }

  componentDidMount() {
    const definitionQuery = {
      language: this.props.language, // defaults to English
      letter: 'a',
      range: 'a-g',
    };
    this.props.listenForOnlineStatus();
    this.props.initializeAppStateAction(definitionQuery);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.layoutAspect !== this.props.layoutAspect) {
      LayoutAnimation.configureNext(fadeInOut);
    }
  }

  loadDefinitions(definitionQuery) {
    const {language, letter, range} = definitionQuery;
    const key = createDefinitionsCacheKey(language, letter, range);
    const {definitionsCache} = this.props;
    if (definitionsCache.hasOwnProperty(key)) {
      this.props.loadDefinitionsFromCacheAction(key);
    } else {
      this.props.loadDefinitionsAction(definitionQuery);
    }
  }

  flushDefinitionsCache() {
    this.props.flushDefinitionsCacheAction();
  }

  setAppLanguage(language) {
    this.props.toggleSearchResultsDisplayAction(false);
    this.props.setAppLanguageAction(language);
  }

  toggleIntroScreen() {
    this.setState({showIntroScreen: !this.state.showIntroScreen});
  }

  handleLayoutChange({nativeEvent}) {
    let {width, height} = nativeEvent.layout;
    let aspect = height > width ? this.LAYOUT_PORTRAIT : this.LAYOUT_LANDSCAPE;
    if (aspect !== this.props.layoutAspect)
      this.props.updateLayoutAspectAction(aspect);
  }

  handleKeyboardShow() {
    if (this.props.layoutAspect === this.LAYOUT_PORTRAIT) {
      this.setState({portraitKeyboardActive: true});
    }
  }

  handleKeyboardHide() {
    this.setState({portraitKeyboardActive: false});
  }

  render() {
    const {
      definitions,
      language,
      introText,
      searchDefinitionsAction,
      fetchingDefinitions,
      videoModal,
      toggleVideoModalAction,
      toggleSearchResultsDisplayAction,
      searchResults,
      layoutAspect,
      offlineDownloads,
      downloadDefinition,
      offlineStatus,
    } = this.props;

    const {showIntroScreen, portraitKeyboardActive} = this.state;

    return (
      <OfflineDownloadContext.Provider
        value={{
          offlineDownloads: offlineDownloads,
          onDownloadRequested: downloadDefinition,
          offlineStatus: offlineStatus,
        }}>
        <View style={GlobalStyles.container} onLayout={this.handleLayoutChange}>
          <Banner
            language={language}
            setLanguage={this.setAppLanguage}
            introText={introText}
            showIntro={showIntroScreen}
            toggleIntro={this.toggleIntroScreen}
          />
          <Navigation
            language={language}
            loadDefinitions={this.loadDefinitions}
            searchDefinitions={searchDefinitionsAction}
            flushDefinitionsCache={this.flushDefinitionsCache}
            searchResults={searchResults}
            toggleSearchResultsDisplay={toggleSearchResultsDisplayAction}
            portraitKeyboardActive={portraitKeyboardActive}
            layoutAspect={layoutAspect}
          />
          <DefinitionList
            currentLanguage={language}
            definitions={definitions}
            fetchingDefinitions={fetchingDefinitions}
            toggleModal={toggleVideoModalAction}
            searchResults={searchResults}
          />
          <VideoModal
            videoModalContent={videoModal}
            language={language}
            displayModal={videoModal.display}
            toggleModal={toggleVideoModalAction}
            layoutAspect={layoutAspect}
          />
        </View>
      </OfflineDownloadContext.Provider>
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
function mapStateToProps({appState, offlineModeState}) {
  return {
    definitions: appState.definitions,
    language: appState.language,
    definitionsCache: appState.definitionsCache,
    fetchingDefinitions: appState.fetchingDefinitions,
    videoModal: appState.videoModal,
    layoutAspect: appState.layoutAspect,
    searchResults: appState.searchResults,
    introText: appState.introText,
    offlineStatus: offlineModeState.offline,
    offlineDownloads: offlineModeState.offlineDownloadsMap,
  };
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
  return bindActionCreators({...AppActions, ...DownloadActions}, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(AppRoot);

export const LAYOUT_PORTRAIT = AppRoot.LAYOUT_PORTRAIT;
export const LAYOUT_LANDSCAPE = AppRoot.LAYOUT_LANDSCAPE;

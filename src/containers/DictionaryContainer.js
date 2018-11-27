/* @flow */

// React
import React, { Component } from 'react';

// React Native
/*
import {
  Text,
  View,
  Platform,
  UIManager,
  LayoutAnimation } from 'react-native';
*/
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as AppActions from '../actions/Actions';

// Styles
import {GlobalStyles} from '../styles/Styles';

// Components
import Banner from '../components/Banner';
import Loading from "../components/Loader";
import DictionaryNavigation from '../components/DictionaryNavigation';
import LetterNavigation from '../components/LetterNavigation';
import DefinitionList from '../components/DefinitionList';
import VideoModal from '../components/VideoModal';

// semantic ui react
import { Segment, Message } from 'semantic-ui-react';

/*
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}
*/
const fadeInOut = {
  duration: 300,
    create: {
      //type: LayoutAnimation.Types.linear,
      //property: LayoutAnimation.Properties.opacity,
    },
    update: {
      //type: LayoutAnimation.Types.easeInEaseOut,
    },
};

class DictionaryContainer extends Component {
  LAYOUT_PORTRAIT = 'LAYOUT_PORTRAIT';
  LAYOUT_LANDSCAPE = 'LAYOUT_LANDSCAPE';
  state = { showIntroScreen: false }
  constructor(props: Object) {
    super(props);
    // Bind all methods to 'this' context here
    (this: any).setAppLanguage = this.setAppLanguage.bind(this);
    (this: any).toggleIntroScreen = this.toggleIntroScreen.bind(this);
    (this: any).loadDefinitions = this.loadDefinitions.bind(this);
    (this: any).flushDefinitionsCache = this.flushDefinitionsCache.bind(this);
    (this: any).handleLayoutChange = this.handleLayoutChange.bind(this);
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

  componentWillReceiveProps(nextProps: Object): void {
    if (nextProps.layoutAspect !== this.props.layoutAspect) {
      //LayoutAnimation.configureNext(fadeInOut);
    }
  }

  loadDefinitions(definitionQuery: Object) {
    this.props.loadDefinitionsAction(definitionQuery);
  }

  flushDefinitionsCache(callbackAction: Object): void {
    this.props.flushDefinitionsCacheAction(callbackAction);
  }

  setAppLanguage(language): void {
    this.props.toggleSearchResultsDisplayAction(false);
    this.props.setAppLanguageAction(language);
  }

  toggleIntroScreen(): void {
    this.setState({ showIntroScreen: !this.state.showIntroScreen });
  }

  handleLayoutChange({nativeEvent}): void {
    let { width, height } = nativeEvent.layout;
    let aspect = height > width ? this.LAYOUT_PORTRAIT : this.LAYOUT_LANDSCAPE;
    if (aspect !== this.props.layoutAspect) this.props.updateLayoutAspectAction(aspect);
  }

  render() {
    const {
      definitions,
      language,
      introText,
      loadDefinitionsAction,
      searchDefinitionsAction,
      definitionsCache,
      fetchingDefinitions,
      videoModal,
      toggleVideoModalAction,
      toggleSearchResultsDisplayAction,
      searchResults,
      layoutAspect,
    } = this.props;
    const { showIntroScreen } = this.state;
    const title = (language === "en") ? "Dictionary" : "Dictionnaire";
    // All of our 'dumb' components will be rendered as children here.
    return(
      <Segment className="lsf-app-dictionary-container">
        <h1 className="lsf-static-page-title">{title}</h1>
        <LetterNavigation
          language={language}
          placeholder="A"
          onSelectLetter={loadDefinitionsAction}
          onSelectRange={loadDefinitionsAction}
          onSearch={searchDefinitionsAction}
        />
        {fetchingDefinitions === true ? (
          <Segment>
            <Loading text="loading definitions" page={false} />
          </Segment>
        ) : null}

        {definitions.length > 0 && fetchingDefinitions === false ? (
          <div className="lsf-definitions-display-container">
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
          </div>
        ) : null}

        {definitions.error === true ? (
          <Message className="lsf-info-message">{definitions.message}</Message>
        ) : null}
    </Segment>
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
    fetchingDefinitions: state.fetching,
    videoModal: state.videoModal,
    layoutAspect: state.layoutAspect,
    searchResults: state.searchResults,
    introText: state.introText,
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(DictionaryContainer);

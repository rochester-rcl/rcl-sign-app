/* @flow */

// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Semantic-ui-react

import {
  Button,
  Menu,
  Icon,
  Segment,
  Sticky,
  Message,
  Grid
} from 'semantic-ui-react';

// Material-ui
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as AppActions from '../actions/Actions';

// Styles
import dashboardStyle from '../assets/jss/layouts/dashboardStyle.jsx';

import image from '../images/image.jpg';

// Components
import Loading from "../components/Loader";
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar';
import DictionaryNavigation from '../components/DictionaryNavigation';
import LetterNavigation from '../components/LetterNavigation';
import DefinitionList from '../components/DefinitionList';
import VideoModal from '../components/VideoModal';



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
    }
}

const drawerWidth = 240;

class DictionaryContainer extends Component {

  state = {
    visible: false,
    mobileOpen: false,
  };

  constructor(props: Object) {
    super(props);
    (this: any).handleSelectLetter = this.handleSelectLetter.bind(this);
    (this: any).handleSearch = this.handleSearch.bind(this);
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  /*
  constructor(props: Object) {
    super(props);
    // Bind all methods to 'this' context here
    (this: any).setAppLanguage = this.setAppLanguage.bind(this);
    (this: any).loadDefinitions = this.loadDefinitions.bind(this);
    (this: any).flushDefinitionsCache = this.flushDefinitionsCache.bind(this);
    (this: any).handleLayoutChange = this.handleLayoutChange.bind(this);
    (this : any).handleHideClick = this.handleHideClick.bind(this);
    (this : any).handleShowClick = this.handleShowClick.bind(this);
    (this : any).handleSidebarHide = this.handleSidebarHide.bind(this);
    (this : any).handleContextRef = this.handleContextRef.bind(this);
    (this: any).checkVideoModalData = this.checkVideoModalData.bind(this);
  }
  */

  componentDidMount() {
    const { language, letter } = this.props;
    // kluge to load english letters at the first go because a state change won't be trigger if language === 'en'
    if (language === 'en') {
      this.props.loadEtymologyAction({
        language: language,
        letter: (letter !== undefined) ? letter : 'a'
      });
    }
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {

  /*
    const { language, videoModal, loadDefinitionsAction } = this.props;
    if (language !== prevProps.language) {
      if (videoModal.display === true) {
        const needsUpdate = this.checkVideoModalData(videoModal);
        if (needsUpdate) {
          // this.props.loadDefinitionsAction
          // fetch based on first letter of opposite language
        }
      }
    }
  }*/

    const { language, loadEtymologyAction, letter } = this.props;
    if (prevProps.language !== language) {
      this.props.loadEtymologyAction({
        language: language,
        letter: (letter !== undefined) ? letter : 'a'
      });
    }
  }

  handleSelectLetter(event: SyntheticEvent, { value }) {
    const { language, loadEtymologyAction } = this.props;
    loadEtymologyAction(
      {
        language: language,
        letter: value,
      }
    );
    this.props.history.push(value);
  }

  handleSearch(term: string) {
    const { language, searchEtymologyAction } = this.props;
    searchEtymologyAction(language, term);
  }

  handleHideClick = () => this.setState({ visible: false })

  handleShowClick = () => {
    const {visible} = this.state;
    if (visible) {
      this.setState({ visible: false });
    }else{
      this.setState({ visible: true });
    }
  }

  handleSidebarHide = () => this.setState({ visible: false })

  handleContextRef = contextRef => this.setState({ contextRef })

  handleSelectLetter(value) {
    const { language, loadEtymologyAction } = this.props;
    loadEtymologyAction(
      {
        language: language,
        letter: value,
      }
    );
    this.props.history.push(value);
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

    /*
    loadDefinitions(definitionQuery: Object) {
      this.props.loadDefinitionsAction(definitionQuery);
    }*/
  }

  flushDefinitionsCache(callbackAction: Object): void {
    this.props.flushDefinitionsCacheAction(callbackAction);
  }

  setAppLanguage(language): void {
    this.props.toggleSearchResultsDisplayAction(false);
    this.props.setAppLanguageAction(language);
  }

  handleLayoutChange({nativeEvent}): void {
    let { width, height } = nativeEvent.layout;
    let aspect = height > width ? this.LAYOUT_PORTRAIT : this.LAYOUT_LANDSCAPE;
    if (aspect !== this.props.layoutAspect) this.props.updateLayoutAspectAction(aspect);
  }

  checkVideoModalData(modalData: Object) {
    const { en, fr } = modalData;
    return (en['definition_id'] !== null && fr['definition_id'] !== null);
  }

  render() {
    const { language, etymology, fetchingEtymology, letter } = this.props;
    const { visible, contextRef } = this.state;

    //const { classes, theme } = this.props;
    const {classes, ...rest} = this.props;

    /*const {
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
    // All of our 'dumb' components will be rendered as children here.*/

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <DictionaryNavigation
          language={language}
          placeholder={(letter !== undefined) ? letter : 'A'}
          onSelectLetter={this.handleSelectLetter}
          onSearch={this.handleSearch}
        />
        {(fetchingEtymology === true) ?
          <Segment>
            <Loading text="loading etymology" page={false} />
          </Segment> : null}
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );


    // All of our 'dumb' components will be rendered as children here.
    return(
      <div className={classes.wrapper}>
        <Sidebar
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          language={this.props.language}
          loadDefinitions={this.loadDefinitions}
          placeholder={(letter !== undefined) ? letter : 'A'}
          onSelectLetter={this.handleSelectLetter}
          onSearch={this.handleSearch}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <div className={classes.content}>
            <div className={classes.container}>
              {(etymology.length > 0 && fetchingEtymology === false) ?
                <DefinitionList
                  etymology={etymology}
                  language={language} /> : null}
              {(etymology.error === true) ?
                <Message className="lsf-info-message">{etymology.message}</Message> : null}
            </div>
          </div>
        </div>
      </div>
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
DictionaryContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};

function mapStateToProps(state, ownProps): Object {
  return {
    etymology: state.etymology,
    language: state.language,
    definitionsCache: state.definitionsCache,
    fetchingEtymology: state.fetching,
    letter: ownProps.match.params.letter,
    history: ownProps.history
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

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)
(withStyles(dashboardStyle)(DictionaryContainer));

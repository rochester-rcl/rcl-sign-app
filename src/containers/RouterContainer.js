import React, { Component } from 'react';

import { Router, Route } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// history
import history from "../utils/history";

// Actions
import * as AppActions from '../actions/Actions';

// Containers

import DictionaryContainer from './DictionaryContainer';

// Components
import StaticPage from '../components/StaticPage';

import Navigation from '../components/Navigation';

import Loading from '../components/Loader';

export class AppRouter extends Component {
  _element = React.createElement;

  constructor(props: Object) {
    super(props);
    this.renderStatic = this.renderStatic.bind(this);
  }

  componentDidMount() {
    this.props.loadNavAction();
    this.staticRoutes = [];
  }

  renderStatic(ownProps: Object, route: Object) {
    const { path, language, ...props } = route;
    return this._element(StaticPage, {...ownProps, ...props}, null);
  }

  render() {
    const { language, nav, setAppLanguageAction } = this.props;
    let items = null;
    if (nav !== null) {
      items = nav[language];
      if (this.staticRoutes.length === 0) {
        this.staticRoutes = nav.en.filter((item) => item.static === true).concat((nav.fr.filter((item) => item.static === true)));
      }
    }
    if (items == null) {
      return (
        <Loading text="Loading ..." />
      )
    } else {
      return(
        <Router history={history}>
          <div className="lsf-app-root-container">
            <Navigation items={items} language={language} handleSelectLanguage={setAppLanguageAction} />
            <Route path="/dictionary" component={DictionaryContainer} />
            <Route path="/dictionnaire" component={DictionaryContainer} />
            {this.staticRoutes.map((route) =>
              <Route path={'/' + route.path} render={(props) => this.renderStatic(props, route)} />
            )}
          </div>
        </Router>
      );
    }
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
    layoutAspect: state.layoutAspect,
    searchResults: state.searchResults,
    introText: state.introText,
    nav: state.nav,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(AppRouter);

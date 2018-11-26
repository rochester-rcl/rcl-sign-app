import React, { Component } from "react";

import { Router, Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// history
import history from "../utils/history";

// Actions
import * as AppActions from "../actions/Actions";

// Containers

import DictionaryContainer from "./DictionaryContainer";
import EtymologyContainer from "./EtymologyContainer";

// Components
import StaticPage from "../components/StaticPage";

import Navigation from "../components/Navigation";

import Loading from "../components/Loader";

import Timeline from "../components/Timeline";

import Intro from "../components/Intro";

export class AppRouter extends Component {
  _element = React.createElement;

  state = { routeTranslations: { en: {}, fr: {} }, pageInitialized: false };

  constructor(props: Object) {
    super(props);
    this.renderStatic = this.renderStatic.bind(this);
    this.initRouteTranslations = this.initRouteTranslations.bind(this);
    this.translationRedirect = this.translationRedirect.bind(this);
  }

  componentDidMount() {
    this.props.loadNavAction();
    this.staticRoutes = [];
  }

  componentDidUpdate(prevProps: Object) {
    if (prevProps.nav === null && this.props.nav !== null) {
      this.initRouteTranslations();
    }
    if (prevProps.language !== this.props.language) {
      this.translationRedirect();
    }
  }

  initRouteTranslations(): void {
    if (this.props.nav === null)
      console.warn(
        "Route Translations can't be initialized before navigation is loaded!"
      );
    const { en, fr } = this.props.nav;
    const translationsEn = {};
    const translationsFr = {};
    en.forEach((item, index) => {
      let frPath = fr[index].path;
      translationsFr[item.path] = frPath;
      translationsEn[frPath] = item.path;
    });
    this.setState({
      routeTranslations: {
        en: translationsEn,
        fr: translationsFr
      }
    });
    // set language based on URL
    const { pathname } = history.location;
    const path = pathname.split("/")[1];
    if (translationsEn[path] !== undefined) {
      this.props.setAppLanguageAction("fr");
    }
  }

  translationRedirect(): void {
    const { pathname } = history.location;
    const { routeTranslations } = this.state;
    const { language } = this.props;
    // a bit of a kluge but allows for additional params to be translated
    let paths = pathname.split("/");
    const path = paths[1];
    const params = paths.slice(2).join("/");
    let newPath = routeTranslations[language][path];
    if (newPath === undefined) newPath = path;
    history.push("/" + newPath + "/" + params);
  }

  renderStatic(ownProps: Object, route: Object) {
    const { path, language, ...props } = route;
    return this._element(StaticPage, { ...ownProps, ...props }, null);
  }

  render() {
    const { language, nav, setAppLanguageAction } = this.props;
    let items = null;
    if (nav !== null) {
      items = nav[language];
      if (this.staticRoutes.length === 0) {
        this.staticRoutes = nav.en
          .filter(item => item.static === true)
          .concat(nav.fr.filter(item => item.static === true));
      }
    }
    if (items == null) {
      return <Loading text="Loading ..." page={true} />;
    } else {

      const timelineShortcode = items.find(
        item => item.path === "history" || item.path === "histoire"
      ).content;

      const intro = items.find(
        item => item.path == "intro"
      );


      return (
        <Router history={history}>
          <div className="lsf-app-root-container">
            <Navigation
              items={items}
              language={language}
              handleSelectLanguage={setAppLanguageAction}
            />
            <Route path="/intro" render={props => <Intro shortcode={intro.content} title={intro.title} /> }/>
            <Route path="/dictionary" component={DictionaryContainer} />
            <Route path="/dictionnaire" component={DictionaryContainer} />
            <Route
              path="/old-asl-lsf/:letter?"
              component={EtymologyContainer}
            />
            <Route
              path="/ancienne-asl-lsf/:letter?"
              component={EtymologyContainer}
            />
            <Route
              path="/history"
              render={props => <Timeline src={timelineShortcode} />}
            />
            <Route
              path="/histoire"
              render={props => <Timeline src={timelineShortcode} />}
            />
            {this.staticRoutes.map((route, index) => (
              <Route
                key={index++}
                path={"/" + route.path}
                render={props => this.renderStatic(props, route)}
              />
            ))}
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
function mapStateToProps(state, ownProps): Object {
  return {
    definitions: state.definitions,
    language: state.language,
    definitionsCache: state.definitionsCache,
    fetchingDefinitions: state.fetching,
    videoModal: state.videoModal,
    layoutAspect: state.layoutAspect,
    searchResults: state.searchResults,
    introText: state.introText,
    nav: state.nav
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(AppRouter);

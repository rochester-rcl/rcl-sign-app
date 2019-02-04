/* @flow */

import React, { Component } from "react";

import { Router, Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Semantic UI
import { Segment, Header, Message } from "semantic-ui-react";
// Actions
import * as AppActions from "../actions/Actions";

// Components
import Loading from "../components/Loader";
import LetterNavigation from "../components/LetterNavigation";
import EtymologyList from "../components/EtymologyList";

class EtymologyContainer extends Component {
  constructor(props: Object) {
    super(props);
    (this: any).handleSelectLetter = this.handleSelectLetter.bind(this);
    (this: any).handleSearch = this.handleSearch.bind(this);
    (this: any).updateURL = this.updateURL.bind(this);
    (this: any).etymoList = null;
  }

  componentDidMount() {
    const { language, letter, query } = this.props;
    // TODO there's a race condition here
    // kluge to load english letters at the first go because a state change won't be trigger if language === 'en'
    this.props.loadEtymologyAction({
      language: language,
      letter: letter !== undefined ? letter : "a"
    });
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    const { language, loadEtymologyAction, letter } = this.props;
    if (prevProps.language !== language) {
      let _letter = letter;
      if (this.etymoList !== null) {
        if (this.etymoList.state.current !== null) {
          const { engEtymology, frEtymology } = this.etymoList.state.current;
          if (language === 'fr') {
            _letter = (frEtymology.letter !== null ? frEtymology.letter : frEtymology.title.charAt(0));
          } else {
            _letter = (engEtymology.letter !== null ? engEtymology.letter : engEtymology.title.charAt(0));
          }
        }
        _letter = _letter.toLowerCase();
        this.props.loadEtymologyAction({
          language: language,
          letter: _letter !== undefined ? _letter : "a"
        });
        this.updateURL(_letter);
      }
    }
  }

  handleSelectLetter(letterInfo: Object) {
    const { language, loadEtymologyAction } = this.props;
    const { letter } = letterInfo;
    loadEtymologyAction({
      language: language,
      letter: letter
    });
    this.props.history.push(letter);
  }

  handleSearch(term: string) {
    const { language, searchEtymologyAction } = this.props;
    searchEtymologyAction(language, term);
  }

  updateURL(letter: string) {
    const { history } = this.props;
    const basename = history.location.pathname.split('/')[1];
    this.props.history.push(`/${basename}/${letter}`);
  }

  render() {
    const {
      language,
      etymology,
      fetchingEtymology,
      letter,
      searchEtymologyAction,
      query
    } = this.props;
    const title = language === "en" ? "Old ASL/LSF" : "Ancienne ASL/LSF";
    const _letter = letter !== undefined ? letter : "a";
    return (
      // etymology component goes here
      <Segment className="lsf-etymology-container lsf-app-body">
        <h1 className="lsf-static-page-title">{title}</h1>
        <LetterNavigation
          language={language}
          letter={_letter}
          onSelectLetter={this.handleSelectLetter}
          onSearch={searchEtymologyAction}
        />
        {fetchingEtymology === true ? (
          <Segment>
            <Loading text="loading etymology" page={false} />
          </Segment>
        ) : null}
        {etymology.length > 0 && fetchingEtymology === false ? (
          <EtymologyList ref={(ref) => this.etymoList = ref} etymology={etymology} language={language} />
        ) : null}
        {etymology.error === true ? (
          <Message className="lsf-info-message">{etymology.message}</Message>
        ) : null}
      </Segment>
    );
  }
}

function mapStateToProps(state, ownProps: Object): Object {
  return {
    etymology: state.etymology,
    language: state.language,
    fetchingEtymology: state.fetching,
    query: state.query,
    letter: ownProps.match.params.letter,
    history: ownProps.history
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(EtymologyContainer);

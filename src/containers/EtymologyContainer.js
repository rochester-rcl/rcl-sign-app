/* @flow */

import React, { Component } from "react";

import { Router, Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Semantic UI
import { Segment, Header, Message } from 'semantic-ui-react';
// Actions
import * as AppActions from "../actions/Actions";

// Components
import Loading from "../components/Loader";
import LetterNavigation from '../components/LetterNavigation';
import EtymologyList from '../components/EtymologyList';

class EtymologyContainer extends Component {
  constructor(props: Object) {
    super(props);
    (this: any).handleSelectLetter = this.handleSelectLetter.bind(this);
    (this: any).handleSearch = this.handleSearch.bind(this);
  }

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

  render() {
    const { language, etymology, fetchingEtymology, letter } = this.props;
    const title = (language === 'en') ? 'Old ASL/LSF' : 'Ancienne ASL/LSF';
    return (
      // etymology component goes here
      <Segment className="lsf-etymology-container">
        <h1 className="lsf-static-page-title">{title}</h1>
        <LetterNavigation language={language} placeholder={(letter !== undefined) ? letter : 'A'} onSelectLetter={this.handleSelectLetter} onSearch={this.handleSearch} />
        {(fetchingEtymology === true) ? <Segment><Loading text="loading etymology" page={false} /></Segment> : null}
        {(etymology.length > 0 && fetchingEtymology === false) ? <EtymologyList etymology={etymology} language={language} /> : null}
        {(etymology.error === true) ? <Message className="lsf-info-message">{etymology.message}</Message> : null}
      </Segment>
    )
  }
}

function mapStateToProps(state, ownProps: Object): Object {
  return {
    etymology: state.etymology,
    language: state.language,
    fetchingEtymology: state.fetching,
    letter: ownProps.match.params.letter,
    history: ownProps.history,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(EtymologyContainer);

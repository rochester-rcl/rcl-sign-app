/* @flow */

import React, { Component } from "react";

import { Router, Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Semantic UI
import { Segment, Header } from 'semantic-ui-react';
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
  }

  handleSelectLetter(event: SyntheticEvent, { value }) {
    const { language, loadEtymologyAction } = this.props;
    loadEtymologyAction(
      {
        language: language,
        letter: value,
      }
    );
  }

  render() {
    const { language, etymology, fetchingEtymology } = this.props;
    const title = (language === 'en') ? 'Old ASL/LSF' : 'Ancienne ASL/LSF';
    return (
      // etymology component goes here
      <Segment className="lsf-etymology-container">
        <h1 className="lsf-static-page-title">{title}</h1>
        <LetterNavigation language={language} onSelectLetter={this.handleSelectLetter} />
        {(fetchingEtymology === true) ? <Segment><Loading text="loading etymology" page={false} /></Segment> : null}
        {(etymology.length > 0 && fetchingEtymology === false) ? <EtymologyList etymology={etymology} language={language} /> : null}
      </Segment>
    )
  }
}

function mapStateToProps(state, ownProps: Object): Object {
  return {
    etymology: state.etymology,
    language: state.language,
    fetchingEtymology: state.fetching,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(EtymologyContainer);

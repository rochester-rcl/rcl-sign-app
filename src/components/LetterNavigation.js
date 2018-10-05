/* @flow */

import React, { Component } from 'react';

// semantic ui react
import { Segment, Dropdown, Divider, Input, Grid } from 'semantic-ui-react';

// constants
import { Alphabet } from '../utils/Constants';

const formattedAlphabet = Alphabet.map((letter) => { return { key: letter, value: letter, text: letter.toUpperCase()} });

export default class LetterNavigation extends Component {

  constructor(props: Object) {
    super(props);
  }

  render() {
    const { language, onSelectLetter } = this.props;
    const prompt = (language === 'en')
      ? 'Choose a Letter'
      : 'Choisissez une Lettre';
    const searchPrompt = (language === 'en') ? 'Search' : 'Cherche';
    return (
      <Segment className="lsf-letter-select-container">
        <Grid columns={3} divided>
            <Grid.Column className="lsf-letter-select-column">
              <h3 className="lsf-letter-select-prompt">{prompt}</h3>
              <Dropdown
                fluid
                placeholder="A"
                selection
                options={formattedAlphabet}
                onChange={onSelectLetter}
              />
            </Grid.Column>
            <Grid.Column className="lsf-letter-select-column">
              <Divider vertical> OR </Divider>
            </Grid.Column>
            <Grid.Column className="lsf-letter-select-column">
              <h3 className="lsf-letter-select-prompt">Search</h3>
              <Input fluid className="lsf-letter-select-input" />
            </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

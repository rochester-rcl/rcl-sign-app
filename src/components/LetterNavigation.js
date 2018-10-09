/* @flow */

import React, { Component } from 'react';

// semantic ui react
import { Segment, Dropdown, Divider, Input, Grid, Button } from 'semantic-ui-react';

// constants
import { Alphabet } from '../utils/Constants';

const formattedAlphabet = Alphabet.map((letter) => { return { key: letter, value: letter, text: letter.toUpperCase()} });

export default class LetterNavigation extends Component {
  state = { search: '' };
  constructor(props: Object) {
    super(props);
    (this: any).onSearchChange = this.onSearchChange.bind(this);
    (this: any).submitSearch = this.submitSearch.bind(this);
    (this: any).handleKeyDown = this.handleKeyDown.bind(this);
  }

  onSearchChange(event: SyntheticEvent, { value }): void {
    this.setState({
      search: value,
    });
  }

  submitSearch(event: SyntheticEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSearch(this.state.search);
  }

  handleKeyDown(event: SyntheticEvent): void {
    if (event.key === 'Enter') this.submitSearch(event);
  }

  render() {
    const { language, placeholder, onSelectLetter } = this.props;
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
                placeholder={placeholder.toUpperCase()}
                selection
                options={formattedAlphabet}
                onChange={onSelectLetter}
              />
            </Grid.Column>
            <Grid.Column className="lsf-letter-select-column">
              <Divider vertical> { (language === 'en') ? 'OR' : 'OU' } </Divider>
            </Grid.Column>
            <Grid.Column className="lsf-letter-select-column">
              <h3 className="lsf-letter-select-prompt">{searchPrompt}</h3>
              <Input fluid className="lsf-letter-select-input"
                onChange={this.onSearchChange}
                onKeyDown={this.handleKeyDown}
                placeholder="..."
                action={<Button icon="search" onClick={this.submitSearch}/>}
              />
            </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

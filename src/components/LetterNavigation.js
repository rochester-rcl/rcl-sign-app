/* @flow */

import React, { Component } from "react";

// semantic ui react
import {
  Segment,
  Dropdown,
  Divider,
  Input,
  Grid,
  Menu,
  Button
} from "semantic-ui-react";

// constants
import { Alphabet } from "../utils/Constants";

const formattedAlphabet = Alphabet.map(letter => {
  return { key: letter, value: letter, text: letter.toUpperCase() };
});

export default class LetterNavigation extends Component {
  state = { search: "", rangeIndex: 0, letter: "a" };
  letterRange: Array<string> = ["a-g", "h-m", "n-r", "s-z"];
  constructor(props: Object) {
    super(props);
    (this: any).onSearchChange = this.onSearchChange.bind(this);
    (this: any).submitSearch = this.submitSearch.bind(this);
    (this: any).formatRangeButtons = this.formatRangeButtons.bind(this);
    (this: any).prepareCallback = this.prepareCallback.bind(this);
    (this: any).handleKeyDown = this.handleKeyDown.bind(this);
    (this: any).handleSelectLetter = this.handleSelectLetter.bind(this);
    (this: any).handleSelectRange = this.handleSelectRange.bind(this);
  }

  onSearchChange(event: SyntheticEvent, { value }): void {
    this.setState({
      search: value
    });
  }

  submitSearch(event: SyntheticEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSearch(this.props.language, this.state.search);
  }

  handleKeyDown(event: SyntheticEvent): void {
    if (event.key === "Enter") this.submitSearch(event);
  }

  handleSelectRange(index: Number): void {
    const { onSelectRange } = this.props;
    this.setState(
      {
        rangeIndex: index
      },
      () => this.prepareCallback(onSelectRange)
    );
  }

  handleSelectLetter(event: SyntheticEvent, { value }): void {
    const { onSelectLetter } = this.props;
    this.setState(
      {
        letter: value
      },
      () => this.prepareCallback(onSelectLetter)
    );
  }

  prepareCallback(callback: ?(letterInfo: Object) => void): void {
    if (callback !== undefined) {
      const { rangeIndex, letter } = this.state;
      const { language } = this.props;
      const range = this.letterRange[rangeIndex];
      const result = { letter: letter, range: range, language: language };
      callback(result);
    }
  }

  formatRangeButtons(): void {
    const { letter, rangeIndex } = this.state;
    const { language } = this.props;
    const rangeText = (language === 'en') ? 'Range' : 'Intervalle'
    return (
      <div className="lsf-app-letter-range-container">
        <Menu stackable className="lsf-letter-range-buttons">
          <Menu.Item className="lsf-letter-range-buttons-header" header>{rangeText}</Menu.Item>
          {this.letterRange.map((letterRange, index) => (
            <Menu.Item
              onClick={() => this.handleSelectRange(index)}
              active={index === rangeIndex}
            >
              {`${letter.toUpperCase()} | ${letterRange}`}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  }

  render() {
    const { language, placeholder, onSelectLetter, onSelectRange } = this.props;
    const prompt =
      language === "en" ? "Choose a Letter" : "Choisissez une Lettre";
    const searchPrompt = language === "en" ? "Search" : "Cherche";
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
              onChange={this.handleSelectLetter}
            />
            {onSelectRange !== undefined ? this.formatRangeButtons() : null}
          </Grid.Column>
          <Grid.Column className="lsf-letter-select-column">
            <Divider vertical> {language === "en" ? "OR" : "OU"} </Divider>
          </Grid.Column>
          <Grid.Column className="lsf-letter-select-column">
            <h3 className="lsf-letter-select-prompt">{searchPrompt}</h3>
            <Input
              fluid
              className="lsf-letter-select-input"
              onChange={this.onSearchChange}
              onKeyDown={this.handleKeyDown}
              placeholder="..."
              action={<Button icon="search" onClick={this.submitSearch} />}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

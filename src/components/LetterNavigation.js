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
import { Alphabet, LETTER_RANGES, LETTER_RANGE_MAP, Range, A_TO_G } from "../utils/Constants";

const formattedAlphabet = Alphabet.map(letter => {
  return { key: letter, value: letter, text: letter.toUpperCase() };
});

export default class LetterNavigation extends Component {
  state = { search: "", rangeIndex: 0, letter: "a" };
  letterRange = LETTER_RANGES;
  constructor(props: Object) {
    super(props);
    (this: any).onSearchChange = this.onSearchChange.bind(this);
    (this: any).submitSearch = this.submitSearch.bind(this);
    (this: any).formatRangeButtons = this.formatRangeButtons.bind(this);
    (this: any).prepareCallback = this.prepareCallback.bind(this);
    (this: any).handleKeyDown = this.handleKeyDown.bind(this);
    (this: any).handleSelectLetter = this.handleSelectLetter.bind(this);
    (this: any).handleSelectRange = this.handleSelectRange.bind(this);
    (this: any).update = this.update.bind(this);
  }

  componentDidMount() {
    const { letter, range } = this.props;
    this.update(letter, range);
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
              key={index}
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

  update(letter: string, range: string) {
    const { onSelectLetter, onSelectRange } = this.props;
    if (range !== undefined) {
      this.setState({
        letter: letter,
        rangeIndex: this.letterRange.indexOf(range),
      });
    } else {
      this.setState({
        letter: letter,
      });
    }
  }

  static formatRange(range: string) {
    const formatted = range.toUpperCase().split(/(TO)/g).join('_');
    const formatted_range = LETTER_RANGE_MAP[formatted];
    if (formatted_range !== undefined) return formatted_range;
    return A_TO_G;
  }

  render() {
    const { language, onSelectLetter, onSelectRange } = this.props;
    const { letter } = this.state;
    const prompt =
      language === "en" ? "Choose a Letter" : "Choisissez une Lettre";
    const searchPrompt = language === "en" ? "Search" : "Cherche";
    let showRange = false;
    if (onSelectRange !== undefined) {
      showRange = true
    }
    if (letter === '0-9') {
      showRange = false;
    }
    return (
      <Segment className="lsf-letter-select-container">
        <Grid columns={3} divided>
          <Grid.Column className="lsf-letter-select-column">
            <h3 className="lsf-letter-select-prompt">{prompt}</h3>
            <Dropdown
              fluid
              placeholder={letter.toUpperCase()}
              selection
              options={formattedAlphabet}
              onChange={this.handleSelectLetter}
            />
            {(showRange === true) ? this.formatRangeButtons() : null}
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

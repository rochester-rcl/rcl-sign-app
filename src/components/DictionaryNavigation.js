/* @flow */

// React
import React, {Component} from 'react';

// Semantic ui react
import {
  Container,
  Button,
  Modal,
  Menu,
  Search,
  Dropdown,
  Segment,
  Icon,
  Input,
  Sidebar
} from 'semantic-ui-react';

// Constants
import {Alphabet, AlphabetMap} from '../utils/Constants';

// Stylesheets
import {PickerStyles, NavigationStyles, ButtonStyles, ModalStyles} from '../styles/Styles';


const formattedAlphabet = Alphabet.map((letter) => { return { key: letter, value: letter, text: letter.toUpperCase()} });

//const Item = Picker.Item;

export default class DictionaryNavigation extends Component {
  state: Object = {
    currentLetter: 'a',
    displayModal: false,
    currentRange: 'a-g',
    currentIndex: 0,
    searchFocused: false,
    search: '',
    isSearching: false
  };
  letterRange: Array<string> = ['a-g', 'h-m', 'n-r', 's-z'];
  constructor(props : Object) {
    super(props);

    (this : any).handleRangeSelect = this.handleRangeSelect.bind(this);
    (this : any).loadNewDefinitions = this.loadNewDefinitions.bind(this);
    (this: any).onSearchChange = this.onSearchChange.bind(this);
    (this: any).submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount(){
    console.log(this.props.loadDefinitions);
  }

  componentDidUpdate(prevProps : Object, prevState : Object): void {
    let {currentLetter, currentRange} = this.state;
    if (prevProps.language !== this.props.language)
      this.loadNewDefinitions(currentLetter, currentRange, true);
    if (prevProps.searchResults !== this.props.searchResults) {
      this.setState({isSearching: this.props.searchResults});
    }
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

  handleRangeSelect(selectedRange : string, index : number) {
    const {currentLetter, currentRange} = this.state;
    this.props.toggleSearchResultsDisplay(false);
    this.handleSearchFocus(false);
    //this.textInput.blur();
    if (selectedRange !== currentRange || this.props.searchResults) {
      this.setState({
        currentRange: selectedRange,
        currentIndex: index
      }, () => this.props.toggleSearchResultsDisplay(false));
      this.loadNewDefinitions(currentLetter, selectedRange, false);
    }
  }

  loadNewDefinitions(currentLetter : string, currentRange : string, clearCache : boolean): void {
    console.log(currentLetter);
    this.props.loadDefinitions({
      language: this.props.language,
      letter: currentLetter,
      range: currentRange
    }, clearCache);
  }

  componentDidUpdate(prevProps : Object, prevState : Object): void {
    let {currentLetter, currentRange} = this.state;
    if (prevProps.language !== this.props.language)
      this.loadNewDefinitions(currentLetter, currentRange, true);
    if (prevProps.searchResults !== this.props.searchResults) {
      this.setState({isSearching: this.props.searchResults});
    }
  }

  render() {
    const {
      displayModal,
      currentLetter,
      currentRange,
      currentIndex,
      searchFocused,
      isSearching
    } = this.state;
    const { language, placeholder, onSelectLetter } = this.props;
    const prompt = (language === 'en')
      ? 'Choose a Letter'
      : 'Choisissez une Lettre';
    const searchPrompt = (language === 'en') ? 'Search' : 'Cherche';

    return (
      <div style={{paddingTop: '7rem'}}>
        <Menu.Item >
          <Input
            onChange={this.onSearchChange}
            onKeyDown={this.handleKeyDown}
            placeholder="..."
            action={<Button icon="search" onClick={this.submitSearch}/>}>
          </Input>
        </Menu.Item>

        <Menu.Item>
          <Dropdown
            button
            className='icon'
            fluid
            placeholder={placeholder.toUpperCase()}
            selection
            options={formattedAlphabet}
            onChange={onSelectLetter} />
        </Menu.Item>
      </div>
    );
  }
}

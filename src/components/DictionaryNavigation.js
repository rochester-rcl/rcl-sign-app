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
  Dropdown
} from 'semantic-ui-react';

// Constants
import {Alphabet} from '../utils/Constants';

// Stylesheets
import {PickerStyles, NavigationStyles, ButtonStyles, ModalStyles} from '../styles/Styles';

//const Item = Picker.Item;

export default class DictionaryNavigation extends Component {
  state: Object = {
    currentLetter: 'a',
    displayModal: false,
    currentRange: 'a-g',
    currentIndex: 0,
    searchFocused: false,
    searchTerm: null,
    isSearching: false
  };
  letterRange: Array<string> = ['a-g', 'h-m', 'n-r', 's-z'];
  constructor(props : Object) {
    super(props);
    (this : any).handleLetterChange = this.handleLetterChange.bind(this);
    (this : any).handleOnOpen = this.handleOnOpen.bind(this);
    (this : any).handleOnClose = this.handleOnClose.bind(this);
    (this : any).handleRangeSelect = this.handleRangeSelect.bind(this);
    (this : any).handleSearchSubmit = this.handleSearchSubmit.bind(this);
    (this : any).handleSearchTextChange = this.handleSearchTextChange.bind(this);
    (this : any).loadNewDefinitions = this.loadNewDefinitions.bind(this);
    (this : any).onKeyboardHide = this.onKeyboardHide.bind(this);
    (this : any).onKeyboardShow = this.onKeyboardShow.bind(this);
    //(this : any).keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
    //(this : any).keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardShow);
  }

  handleLetterChange(selectedLetter : string) {
    const {currentLetter, currentRange} = this.state;
    if (selectedLetter !== currentLetter || this.props.searchResults) {
      this.setState({
        currentLetter: selectedLetter
      }, () => this.props.toggleSearchResultsDisplay(false));
      this.loadNewDefinitions(selectedLetter, currentRange, true);
    }
    this.handleModalToggle();
  }

  handleSearchSubmit() {
    this.setState({
      isSearching: true
    }, () => this.props.searchDefinitions(this.props.language, this.state.searchTerm));
  }

  handleSearchTextChange(text : string) {
    this.setState({searchTerm: text});
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
    this.props.loadDefinitions({
      language: this.props.language,
      letter: currentLetter,
      range: currentRange
    }, clearCache);
  }

  handleOnOpen(){
    this.handleSearchFocus(false);
    //this.textInput.blur();
    this.setState({displayModal: true});
  }

  handleOnClose(){
    this.setState({displayModal: false});
  }

  handleSearchFocus(focusState : boolean): void {
    this.setState({searchFocused: focusState});
  }

  onKeyboardHide(): void {
    this.handleSearchFocus(false);
    this.textInput.blur();
  }

  onKeyboardShow(): void {
    // Don't know if I really need this yet
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
    const {searchResults, language} = this.props;
    let title: string = currentLetter.toUpperCase();
    let promptMessage = language === 'en'
      ? 'Choose a letter'
      : 'Choisissez une lettre';
    const searchMessage = () => {
      if (language === 'fr')
        return 'Chercher ...';
      return 'Search ...';
    }

    return (
      <Container>
        <Search
          onFocus={() => this.handleSearchFocus(true)}
          onSearchChange={this.handleSearchTextChange}
          onResultSelect={this.handleSearchSubmit}/>
        <Modal
          trigger=
          {
            <Button
              onClick={this.handleOnOpen}>
              {title}
            </Button>
          }
          open={this.state.displayModal}
          onClose={this.handleOnClose}>

          <Modal.Content>
            <div style={{
                marginTop: 20,
                alignSelf: 'center',
                flex: 0.15
              }}>{promptMessage}</div>
            <Dropdown
              placeholder='Select Letter'
              fluid
              multiple 
              search
              selection
              options={Alphabet} />
)
            <PickerStyles variant={{
                languagePicker: true
              }} selectedValue={currentLetter} onValueChange={(letter) => this.handleLetterChange(letter)}>
              {
                Alphabet.map((letter, index) => {
                  return <div key={index} label={letter.toUpperCase()} value={letter}/>
                })
              }
            </PickerStyles>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleOnClose}>
              {language === 'en' ? 'back' : 'retour'}
            </Button>
          </Modal.Actions>

        </Modal>
        <div>
          {
            this.letterRange.map((range, index) =>
              <Button key={index} onClick={() => this.handleRangeSelect(range, index)}>
                {range}
              </Button>)
          }
        </div>
      </Container>);
  }
}

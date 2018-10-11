/* @flow */

// React
import React, {Component} from 'react';

// React Native

// Constants
import {Alphabet} from '../utils/Constants';

// Stylesheets
import {PickerStyles, NavigationStyles, ButtonStyles, ModalStyles} from '../styles/Styles';

// Semantic UI
import {Button, Icon, Search, Modal} from 'semantic-ui-react';

export default class DictionaryNavigation extends Component {
  state: Object = {
    currentLetter: 'a',
    displayModal: false,
    currentRange: 'a-g',
    currentIndex: 0,
    searchFocused: false,
    searchTerm: null,
    isSearching: false,
    isActive: false,
    open: false
  };

  letterRange: Array<string> = ['a-g', 'h-m', 'n-r', 's-z'];
  constructor(props : Object) {
    super(props);
    (this : any).handleLetterChange = this.handleLetterChange.bind(this);
    (this : any).handleModalToggle = this.handleModalToggle.bind(this);
    (this : any).handleRangeSelect = this.handleRangeSelect.bind(this);
    (this : any).handleSearchSubmit = this.handleSearchSubmit.bind(this);
    (this : any).handleSearchTextChange = this.handleSearchTextChange.bind(this);
    (this : any).loadNewDefinitions = this.loadNewDefinitions.bind(this);
    (this: any).handleShowModal = this.handleShowModal.bind(this);
    (this: any).handleCloseModal = this.handleCloseModal.bind(this);
    (this: any).handleActiveSelection = this.handleActiveSelection.bind(this);
    (this : any).onKeyboardHide = this.onKeyboardHide.bind(this);
    (this : any).onKeyboardShow = this.onKeyboardShow.bind(this);
    //(this : any).keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
    //(this : any).keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardShow);
  }

  handleShowModal = dimmer => () =>
  {
    this.setState({dimmer, open: true})
    this.handleActiveSelection();
  }

  handleCloseModal = () =>
  {
    this.setState({open: false});
  }

  handleActiveSelection = () =>
  {
      this.setState({isActive: true});
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

  handleModalToggle() {
    this.handleSearchFocus(false);
    this.handleShowModal('blurring');
    if (!this.state.displayModal) {
      this.setState({displayModal: true});
    } else {
      this.setState({displayModal: false});
    }
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
      isSearching,
      open,
      dimmer
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
    <div>

      <Search
        placeholder={searchMessage()}
        onSearchChange={this.handleSearchTextChange}
        onResultSelect={this.handleSearchSubmit}/>

      {/*<Button onClick={this.handleShowModal('blurring')}>Blurring</Button>*/}

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={this.handleCloseModal}>

        {/*<Button
          onClick={this.handleModalToggle}
          >
            {
              language === 'en'
                ? 'back'
                : 'retour'
            }
        </Button>*/}

        <Modal.Header>{promptMessage}</Modal.Header>

        {/*not showing up -- need to fix*/}
        <Modal.Content
          scrolling
          size='small'
          selectedValue={currentLetter}
          onValueChange={(letter) => this.handleLetterChange(letter)}>
          <div role='list' class='ui link list center aligned container'>
          {
            Alphabet.map((letter, index) => {
              return (
                <a
                  role='listitem'
                  class='item'
                  key={index}
                  label={letter.toUpperCase()}
                  value={letter}>
                  {letter.toUpperCase()}
                </a>)
            })
          }
          </div>
        </Modal.Content>

      </Modal>

        <Button
          onClick={this.handleShowModal('bluring')}
          >{title}

          {/*<Button variant={searchFocused || searchResults || isSearching
              ? {
                buttonText: true
              }
              : {
                selectedRangeButtonText: true
              }}>{title}
          </Button>*/}

        </Button>

        <span>

          {
            this.letterRange.map((range, index) => <Button key={index} variant={index !== currentIndex || searchFocused || searchResults || isSearching
                ? {
                  letterRangeButton: true
                }
                : {
                  selectedRangeButton: true
                }} onClick={() => this.handleRangeSelect(range, index)}>{range}
              {/*<Button variant={index !== currentIndex || searchFocused || searchResults || isSearching
                  ? {
                    buttonText: true
                  }
                  : {
                    selectedRangeButtonText: true
                  }}>{range}</Button>*/}
              </Button>)
          }

      </span>
    </div>
    );
  }
}

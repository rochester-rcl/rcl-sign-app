/* @flow */

// React
import React, {Component} from 'react';

// React Native
/*
import {
  Text, //text
  View, //div
  Picker, //Renders the native picker component on iOS and Android
  TouchableOpacity, //button
  Modal, // The Modal component is a simple way to present content above an enclosing view.
  TextInput, //form input
  Keyboard // allows you to listen for native events and react to them, as well as make changes to the keyboard, like dismissing it.
} from 'react-native';
*/

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
    (this : any).handleModalToggle = this.handleModalToggle.bind(this);
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
    this.textInput.blur();
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
    this.textInput.blur();
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

    return (<NavigationStyles variant={{
        navContainer: true
      }}>
      <NavigationStyles variant={{
          searchBar: true
        }} placeholder={searchMessage()} placeholderColor='#000' onFocus={() => this.handleSearchFocus(true)} underlineColorAndroid='#4286f4' ref={(ref) => this.textInput = ref} onChangeText={this.handleSearchTextChange} onSubmitEditing={this.handleSearchSubmit}/>
      <NavigationStyles variant={{
          letterPicker: true
        }}>
        <ModalStyles animationType={"fade"} transparent={false} variant={{
            letterPickerModal: true
          }} visible={this.state.displayModal} onRequestClose={this.handleModalToggle}>
          <ButtonStyles onPress={this.handleModalToggle} variant={{
              backButton: true
            }}>
            <ButtonStyles variant={{
                backButtonTextInverted: true
              }}>
              {
                language === 'en'
                  ? 'back'
                  : 'retour'
              }
            </ButtonStyles>
          </ButtonStyles>
          <p style={{
              marginTop: 20,
              alignSelf: 'center',
              flex: 0.15
            }}>{promptMessage}</p>
          <PickerStyles variant={{
              languagePicker: true
            }} selectedValue={currentLetter} onValueChange={(letter) => this.handleLetterChange(letter)}>
            {
              Alphabet.map((letter, index) => {
                return <div key={index} label={letter.toUpperCase()} value={letter}/>
              })
            }
          </PickerStyles>
        </ModalStyles>
        <ButtonStyles onPress={this.handleModalToggle} variant={searchFocused || searchResults || isSearching
            ? {
              buttonBackgroundBlurred: true
            }
            : {
              buttonBackground: true
            }}>
          <ButtonStyles variant={searchFocused || searchResults || isSearching
              ? {
                buttonText: true
              }
              : {
                selectedRangeButtonText: true
              }}>{title}</ButtonStyles>
        </ButtonStyles>
      </NavigationStyles>
      <NavigationStyles variant={{
          letterRange: true
        }}>
        {
          this.letterRange.map((range, index) => <ButtonStyles key={index} variant={index !== currentIndex || searchFocused || searchResults || isSearching
              ? {
                letterRangeButton: true
              }
              : {
                selectedRangeButton: true
              }} onPress={() => this.handleRangeSelect(range, index)}>
            <ButtonStyles variant={index !== currentIndex || searchFocused || searchResults || isSearching
                ? {
                  buttonText: true
                }
                : {
                  selectedRangeButtonText: true
                }}>{range}</ButtonStyles>
          </ButtonStyles>)
        }
      </NavigationStyles>
    </NavigationStyles>);
  }
}

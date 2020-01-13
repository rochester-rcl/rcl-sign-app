/* @flow */

// React
import React, {Component, createRef} from 'react';

// React Native
import {
  Text,
  View,
  Picker,
  TouchableOpacity,
  BackHandler,
  Modal,
  TextInput,
  Keyboard,
} from 'react-native';
const Item = Picker.Item;

// Constants
import {Alphabet, LETTER_RANGE} from '../utils/Constants';

import {LAYOUT_PORTRAIT, LAYOUT_LANDSCAPE} from '../containers/AppRoot';

// Stylesheets
import {
  PickerStyles,
  NavigationStyles,
  ButtonStyles,
  ModalStyles,
} from '../styles/Styles';

export default class Navigation extends Component {
  state: Object = {
    currentLetter: 'a',
    displayModal: false,
    currentRange: 'a-g',
    currentIndex: 0,
    searchFocused: false,
    searchTerm: null,
    isSearching: false,
  };
  letterRange: Array<string> = LETTER_RANGE;
  constructor(props: Object) {
    super(props);
    (this: any).handleLetterChange = this.handleLetterChange.bind(this);
    (this: any).handleModalToggle = this.handleModalToggle.bind(this);
    (this: any).handleRangeSelect = this.handleRangeSelect.bind(this);
    (this: any).handleSearchSubmit = this.handleSearchSubmit.bind(this);
    (this: any).handleSearchTextChange = this.handleSearchTextChange.bind(this);
    (this: any).loadNewDefinitions = this.loadNewDefinitions.bind(this);
    (this: any).onKeyboardHide = this.onKeyboardHide.bind(this);
    (this: any).keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.onKeyboardHide,
    );
    this.textInputRef = createRef();
  }

  handleLetterChange(selectedLetter: string) {
    const {currentLetter, currentRange} = this.state;
    if (selectedLetter !== currentLetter || this.props.searchResults) {
      this.setState({currentLetter: selectedLetter}, () =>
        this.props.toggleSearchResultsDisplay(false),
      );
      this.loadNewDefinitions(selectedLetter, currentRange, true);
    }
    this.handleModalToggle();
  }

  handleSearchSubmit() {
    this.setState(
      {
        isSearching: true,
      },
      () => {
        this.props.searchDefinitions(
          this.props.language,
          this.state.searchTerm,
        );
        this.handleSearchFocus(false);
      },
    );
  }

  handleSearchTextChange(text: string) {
    this.setState({searchTerm: text});
  }

  handleRangeSelect(selectedRange: string, index: number) {
    const {current} = this.textInputRef;
    const {currentLetter, currentRange} = this.state;
    this.props.toggleSearchResultsDisplay(false);
    this.handleSearchFocus(false);
    if (current) {
      current.blur();
    }
    if (selectedRange !== currentRange || this.props.searchResults) {
      this.setState({currentRange: selectedRange, currentIndex: index}, () =>
        this.props.toggleSearchResultsDisplay(false),
      );
      this.loadNewDefinitions(currentLetter, selectedRange, false);
    }
  }

  loadNewDefinitions(
    currentLetter: string,
    currentRange: string,
    clearCache: boolean,
  ): void {
    this.props.loadDefinitions(
      {
        language: this.props.language,
        letter: currentLetter,
        range: currentRange,
      },
      clearCache,
    );
  }

  handleModalToggle() {
    const {current} = this.textInputRef;
    this.handleSearchFocus(false);
    if (current) {
      current.blur();
    }
    if (!this.state.displayModal) {
      this.setState({displayModal: true});
    } else {
      this.setState({displayModal: false});
    }
  }

  handleSearchFocus(focusState: boolean): void {
    this.setState({searchFocused: focusState});
  }

  onKeyboardHide(): void {
    const {current} = this.textInputRef;
    this.handleSearchFocus(false);
    if (current) {
      current.blur();
    }
  }

  componentDidUpdate(prevProps: Object, prevState: Object): void {
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
    } = this.state;
    const {
      searchResults,
      language,
      portraitKeyboardActive,
      layoutAspect,
    } = this.props;
    let title: string = currentLetter.toUpperCase();
    let promptMessage =
      language === 'en' ? 'Choose a letter' : 'Choisissez une lettre';
    const searchMessage = () => {
      if (language === 'fr') return 'Chercher ...';
      return 'Search ...';
    };

    return (
      <View
        style={
          layoutAspect === 'LAYOUT_LANDSCAPE'
            ? NavigationStyles.navContainerLandscape
            : NavigationStyles.navContainer
        }>
        <TextInput
          style={
            searchFocused && portraitKeyboardActive
              ? NavigationStyles.searchBarFocused
              : NavigationStyles.searchBar
          }
          placeholder={searchMessage()}
          placeholderColor="#000"
          onFocus={() => this.handleSearchFocus(true)}
          underlineColorAndroid="#4286f4"
          ref={this.textInputRef}
          onChangeText={this.handleSearchTextChange}
          onSubmitEditing={this.handleSearchSubmit}
        />
        <View
          style={
            searchFocused && portraitKeyboardActive
              ? NavigationStyles.hideNav
              : NavigationStyles.letterPicker
          }>
          <Modal
            animationType={'fade'}
            transparent={false}
            style={ModalStyles.letterPickerModal}
            visible={this.state.displayModal}
            onRequestClose={this.handleModalToggle}
            supportedOrientations={['portrait', 'landscape']}>
            <TouchableOpacity
              onPress={this.handleModalToggle}
              style={ButtonStyles.backButton}>
              <Text style={ButtonStyles.backButtonTextInverted}>
                {language === 'en' ? 'back' : 'retour'}
              </Text>
            </TouchableOpacity>
            <Text style={{marginTop: 20, alignSelf: 'center', flex: 0.15}}>
              {promptMessage}
            </Text>
            <Picker
              style={PickerStyles.languagePicker}
              selectedValue={currentLetter}
              onValueChange={letter => this.handleLetterChange(letter)}>
              {Alphabet.map((letter, index) => {
                return (
                  <Item
                    key={index}
                    label={letter.toUpperCase()}
                    value={letter}
                  />
                );
              })}
            </Picker>
          </Modal>
          <TouchableOpacity
            onPress={this.handleModalToggle}
            style={
              searchFocused || searchResults || isSearching
                ? ButtonStyles.buttonBackgroundBlurred
                : ButtonStyles.buttonBackground
            }>
            <Text
              style={
                searchFocused || searchResults || isSearching
                  ? ButtonStyles.buttonText
                  : ButtonStyles.selectedRangeButtonText
              }>
              {title}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={
            searchFocused && portraitKeyboardActive
              ? NavigationStyles.hideNav
              : NavigationStyles.letterRange
          }>
          {this.letterRange.map((range, index) => (
            <TouchableOpacity
              key={index}
              style={
                index !== currentIndex ||
                searchFocused ||
                searchResults ||
                isSearching
                  ? ButtonStyles.letterRangeButton
                  : ButtonStyles.selectedRangeButton
              }
              onPress={() => this.handleRangeSelect(range, index)}>
              <Text
                style={
                  index !== currentIndex ||
                  searchFocused ||
                  searchResults ||
                  isSearching
                    ? ButtonStyles.buttonText
                    : ButtonStyles.selectedRangeButtonText
                }>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

/* @flow */

// React
import React, {Component, createRef} from 'react';

// React Native
import {
  Text,
  View,
  Picker,
  TouchableOpacity,
  Animated,
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
  state = {
    currentLetter: 'a',
    displayModal: false,
    currentRange: 'a-g',
    currentIndex: 0,
    searchFocused: false,
    searchTerm: null,
    isSearching: false,
    searchFocusTransition: new Animated.Value(1),
  };
  letterRange = LETTER_RANGE;
  constructor(props) {
    super(props);
    this.handleLetterChange = this.handleLetterChange.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleRangeSelect = this.handleRangeSelect.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.loadNewDefinitions = this.loadNewDefinitions.bind(this);
    this.onKeyboardHide = this.onKeyboardHide.bind(this);
    this.animateSearchBarFocus = this.animateSearchBarFocus.bind(this);
    this.keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => this.onKeyboardHide(),
    );
    this.textInputRef = createRef();
  }

  componentWillUnmount() {
    this.keyboardHideListener.remove();
  }

  handleLetterChange(selectedLetter) {
    const {currentLetter, currentRange} = this.state;
    if (selectedLetter !== currentLetter || this.props.searchResults) {
      this.setState({currentLetter: selectedLetter}, () =>
        this.props.toggleSearchResultsDisplay(false),
      );
      this.loadNewDefinitions(selectedLetter, currentRange);
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

  handleSearchTextChange(text) {
    this.setState({searchTerm: text});
  }

  handleRangeSelect(selectedRange, index) {
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
      this.loadNewDefinitions(currentLetter, selectedRange);
    }
  }

  loadNewDefinitions(currentLetter, currentRange) {
    this.props.loadDefinitions({
      language: this.props.language,
      letter: currentLetter,
      range: currentRange,
    });
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

  animateSearchBarFocus() {
    const {searchFocusTransition, searchFocused} = this.state;
    if (searchFocused) {
      Animated.timing(searchFocusTransition, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(searchFocusTransition, {
        toValue: 1,
        duration: 500,
      }).start();
    }
  }

  handleSearchFocus(focusState) {
    this.setState({searchFocused: focusState}, this.animateSearchBarFocus);
  }
  // onKeyboardHide not firing on Android in landscape mode - this should fix it for now
  handleBackDuringSearch() {
    console.log("HERE");
    const { searchFocused } = this.state;
    const { layoutAspect } = this.props;
    if (searchFocused && layoutAspect === 'LAYOUT_LANDSCAPE') {
      this.handleSearchFocus(false);
    }
  }

  onKeyboardHide() {
    const {current} = this.textInputRef;
    this.handleSearchFocus(false);
    if (current) {
      current.blur();
    }
  }

  componentDidUpdate(prevProps, prevState) {
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
      searchFocusTransition,
    } = this.state;
    const {
      searchResults,
      language,
      portraitKeyboardActive,
      layoutAspect,
    } = this.props;
    const title = currentLetter.toUpperCase();
    const promptMessage =
      language === 'en' ? 'Choose a letter' : 'Choisissez une lettre';
    const searchMessage = () => {
      if (language === 'fr') return 'Chercher ...';
      return 'Search ...';
    };
    const pickerModalStyle = searchFocused
      ? NavigationStyles.hideNav
      : NavigationStyles.letterPicker;
    const letterRangeStyle = searchFocused
      ? NavigationStyles.hideNav
      : NavigationStyles.letterRange;
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
          ref={this.textInputRef}
          onChangeText={this.handleSearchTextChange}
          onSubmitEditing={this.handleSearchSubmit}
        />
        <Animated.View
          style={{
            ...pickerModalStyle,
            opacity: searchFocusTransition,
          }}>
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
                ? ButtonStyles.letterRangeButton
                : ButtonStyles.selectedRangeButton
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
        </Animated.View>
        <Animated.View
          style={{
            ...letterRangeStyle,
            opacity: searchFocusTransition,
          }}>
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
        </Animated.View>
      </View>
    );
  }
}

/* @flow */

// React
import React, { Component } from 'react';

// React Native
import {
  Text,
  View,
  Picker,
  TouchableOpacity,
  Modal,
  TextInput } from 'react-native';
const Item = Picker.Item;

// Constants
import { Alphabet } from '../utils/Constants';

// Stylesheets
import {
  PickerStyles,
  NavigationStyles,
  ButtonStyles,
  ModalStyles } from '../styles/Styles';

export default class Navigation extends Component {
  state = { currentLetter: 'a', displayModal: false, currentRange: 'a-g', currentIndex: 0 };
  constructor(props: Object) {
    super(props);
    (this: any).handleLetterChange = this.handleLetterChange.bind(this);
    (this: any).handleModalToggle = this.handleModalToggle.bind(this);
    (this: any).handleRangeSelect = this.handleRangeSelect.bind(this);
    (this: any).loadNewDefinitions = this.loadNewDefinitions.bind(this);
    (this: any).letterRange = ['a-g', 'h-m', 'n-r', 's-z'];
  }

  handleLetterChange(selectedLetter: string) {
    const { currentLetter, currentRange } = this.state;
    if (selectedLetter !== currentLetter) {
      this.setState({ currentLetter: selectedLetter });
      this.loadNewDefinitions(selectedLetter, currentRange, true);
    }
    this.handleModalToggle();
  }

  handleRangeSelect(selectedRange: string, index: number) {
    const { currentLetter, currentRange } = this.state;
    if (selectedRange !== currentRange) {
      this.setState({ currentRange: selectedRange, currentIndex: index });
      this.loadNewDefinitions(currentLetter, selectedRange, false);
    }
  }

  loadNewDefinitions(currentLetter: string, currentRange: string, clearCache: boolean): void {
    this.props.loadDefinitions({
      language: this.props.language,
      letter: currentLetter,
      range: currentRange,
    }, clearCache);
  }

  handleModalToggle() {
    if (!this.state.displayModal) {
      this.setState({ displayModal: true });
    } else {
      this.setState({ displayModal: false });
    }
  }

  render() {
    const { displayModal, currentLetter, currentRange, currentIndex } = this.state;
    let title: string = currentLetter.toUpperCase();
    return(
      <View style={NavigationStyles.navContainer}>
        <View style={NavigationStyles.toolContainer}>
          <Modal
            animationType={"fade"}
            transparent={false}
            style={ModalStyles.letterPickerModal}
            visible={this.state.displayModal}
            >
            <Text style={{marginTop: 40, alignSelf: 'center', flex: 0.25}}> Add some sort of prompt here? </Text>
            <Picker
              style={PickerStyles.languagePicker}
              selectedValue={currentLetter}
              onValueChange={(letter) => this.handleLetterChange(letter)}>
              {Alphabet.map((letter, index) => {
                return <Item key={index} label={letter.toUpperCase()} value={letter}/>
              })}
            </Picker>
          </Modal>
          <TouchableOpacity
            onPress={this.handleModalToggle}
            style={ButtonStyles.buttonBackground}
          >
            <Text style={ButtonStyles.selectedRangeButtonText}>{title}</Text>
          </TouchableOpacity>
          <TextInput
            style={NavigationStyles.searchBar}
            placeholder="Search ..."
          />
        </View>
        <View style={NavigationStyles.letterRange}>
          {this.letterRange.map((range, index) =>
            <TouchableOpacity
              key={index}
              style={index === currentIndex ? ButtonStyles.selectedRangeButton : ButtonStyles.letterRangeButton}
              onPress={() => this.handleRangeSelect(range, index)}
            >
              <Text style={index === currentIndex ? ButtonStyles.selectedRangeButtonText : ButtonStyles.buttonText}>{range}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

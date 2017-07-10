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
  state = { currentLetter: 'a', displayModal: false, currentRange: 'a-g' };
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
      // Promise ensures cache is cleared before we end up adding to it
      this.props.flushDefinitionsCache().then(() => {
        this.loadNewDefinitions(selectedLetter, currentRange);
      });
    }
    this.handleModalToggle();
  }

  handleRangeSelect(selectedRange: string) {
    const { currentLetter, currentRange } = this.state;
    if (selectedRange !== currentRange) {
      this.setState({ currentRange: selectedRange });
      this.loadNewDefinitions(currentLetter, selectedRange);
    }
  }

  loadNewDefinitions(currentLetter, currentRange): void {
    this.props.loadDefinitions({
      language: this.props.language,
      letter: currentLetter,
      range: currentRange,
    });
  }

  handleModalToggle() {
    if (!this.state.displayModal) {
      this.setState({ displayModal: true });
    } else {
      this.setState({ displayModal: false });
    }
  }

  render() {
    const { displayModal, currentLetter, currentRange } = this.state;
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
            <Text style={ButtonStyles.buttonText}>{title}</Text>
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
              style={ButtonStyles.letterRangeButton}
              onPress={() => this.handleRangeSelect(range)}
            >
              <Text style={ButtonStyles.buttonText}>{range}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

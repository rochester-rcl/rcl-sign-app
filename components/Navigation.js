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
  state = { letter: 'a', displayModal: false }
  constructor(props: Object) {
    super(props);
    (this: any).handleValueChange = this.handleValueChange.bind(this);
    (this: any).handleModalToggle = this.handleModalToggle.bind(this);
  }

  handleValueChange(selectedLetter: string) {
    this.setState( { letter: selectedLetter });
    this.handleModalToggle();
  }

  handleModalToggle() {
    if (!this.state.displayModal) {
      this.setState({ displayModal: true });
    } else {
      this.setState({ displayModal: false });
    }
  }
  render() {
    const { displayModal } = this.state;
    let title: string = this.state.letter.toUpperCase();

    return(
      <View style={NavigationStyles.navContainer}>
        <Modal
          animationType={"fade"}
          transparent={false}
          style={ModalStyles.letterPickerModal}
          visible={this.state.displayModal}
          >
          <Text style={{marginTop: 40, alignSelf: 'center', flex: 0.25}}> Add some sort of prompt here? </Text>
          <Picker
            style={PickerStyles.languagePicker}
            selectedValue={this.state.letter}
            onValueChange={(letter) => this.handleValueChange(letter)}>
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
    );
  }
}

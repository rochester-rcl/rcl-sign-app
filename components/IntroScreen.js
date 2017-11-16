/* @flow */

// React
import React, { Component } from 'react';

// React Native
import {
  Text,
  View,
  Modal,
  ListView,
  TouchableOpacity,
  Linking,
} from 'react-native';

// Styles
import { IntroStyles, DefinitionDisplayStyles, ButtonStyles } from '../styles/Styles';

const IntroScreen = (props: Object) => {
  const { language, introText, visible, onClose } = props;

  let intro;
  if (language === 'en') {
    intro = introText.en;
  } else {
    intro = introText.fr;
  }
  let listSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  let mailto = 'mailto:' + intro.contact.link.address + '?subject=LSF-ASL App Feedback';
  return (
    <Modal
      animationType={"fade"}
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      >
      <View style={IntroStyles.introView}>
        <View style={IntroStyles.headerView}>
          <TouchableOpacity
            onPress={onClose}
            style={ButtonStyles.introBackButton}>
            <Text style={ButtonStyles.introBackButtonText}>
              {language === 'en' ? 'back' : 'retour'}
            </Text>
          </TouchableOpacity>
          <Text style={IntroStyles.header}>{intro.intro}</Text>
        </View>
        <ListView
          style={IntroStyles.instructions}
          dataSource={listSource.cloneWithRows(intro.instructions)}
          renderRow={(data) =>
            <Text style={DefinitionDisplayStyles.definition}>{data}</Text>
          }
        />
        <View style={IntroStyles.contactView}>
          <Text style={IntroStyles.contactText}>{intro.contact.message}</Text>
          <Text style={IntroStyles.contactText}>{intro.contact.link.message}</Text>
          <TouchableOpacity onPress={() => Linking.canOpenURL(mailto).then(
            supported => {
              if (!supported) {
                console.log("can't open " + intro.contact.link.address);
              } else {
                Linking.openURL(mailto);
              }
            }
          )}>
            <Text style={IntroStyles.contactLink}>{intro.contact.link.address}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default IntroScreen;

/* @flow */

// React
import React, { Component } from 'react';

// React Native
/*
import {
  Text,
  View,
  Modal,
  ListView,
  TouchableOpacity,
  Linking,
} from 'react-native';
*/
// Styles
import { IntroStyles, DefinitionDisplayStyles, ButtonStyles } from '../styles/Styles';

export default class IntroScreen extends Component {


  render() {

    const { language, introText, visible, onClose } = this.props;

    let intro;
    if (language === 'en') {
      intro = introText.en;
    } else {
      intro = introText.fr;
    }
    /*
    let listSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    */
    let mailto = 'mailto:' + intro.contact.link.address + '?subject=LSF-ASL App Feedback';

    if (visible) {
      return(
        <div
          animationType={"fade"}
          transparent={false}
          visible={visible}
          onRequestClose={onClose}
          >
          <div style={IntroStyles.introView}>
            <IntroStyles variant={{headerView: true }}>
              <ButtonStyles
                onPress={onClose}
                variant={{introBackButton: true }}>
                <p style={ButtonStyles.introBackButtonText}>
                  {language === 'en' ? 'back' : 'retour'}
                </p>
              </ButtonStyles>
              <p class="ui header">{intro.intro}</p>
            </IntroStyles>
            <IntroStyles variant={{ contactView: true }}>
            {(intro.instructions).map((data) => {
              <div style={IntroStyles.instructions}>
                something is here
              </div>
            })}
            </IntroStyles>
            {/*
            <ListView
              style={IntroStyles.instructions}
              dataSource={listSource.cloneWithRows(intro.instructions)}
              renderRow={(data) =>
                <p style={DefinitionDisplayStyles.definition}>{data}</p>
              }
            />
            */}
            <IntroStyles variant={{ contactView: true }}>
              <IntroStyles variant={{ contactText: true }}>{intro.contact.message}</IntroStyles>
              <IntroStyles variant={{ contactText: true }}>{intro.contact.link.message}</IntroStyles>
              {/*
              <ButtonStyles onPress={() => Linking.canOpenURL(mailto).then(
                supported => {
                  if (!supported) {
                    console.log("can't open " + intro.contact.link.address);
                  } else {
                    Linking.openURL(mailto);
                  }
                }
              )}>
                <IntroStyles variant={{ contactLink: true }}>{intro.contact.link.address}</IntroStyles>
              </ButtonStyles>*/
              }
            </IntroStyles>
          </div>
        </div>
      );
    }else{
      return(
        <div>
          hello
        </div>
      );
    }
  }
}

//export default IntroScreen;

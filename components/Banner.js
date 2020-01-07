/* @flow */

// React
import React, { Component } from 'react';

// React Native
import {
  Text,
  View,
  Image,
  TouchableOpacity } from 'react-native';

// Styles
import { BannerStyles } from '../styles/Styles';

import IntroScreen  from './IntroScreen';


const Banner = (props: Object) => {
  let { language, setLanguage, introText, showIntro, toggleIntro } = props;
  return(
    <View style={BannerStyles.bannerContainer}>
      <TouchableOpacity onPress={() => { setLanguage('fr') } }>
        <View style={BannerStyles.bannerImageContainer}>
          <Image resizeMode={'contain'} style={ language === 'fr' ? BannerStyles.selectedLanguage : BannerStyles.bannerImage } source={require('../images/fr_flag.png')}/>
        </View>
      </TouchableOpacity>
      <View style={BannerStyles.bannerImageContainer}>
        <TouchableOpacity onPress={toggleIntro}>
          <Image resizeMode={'contain'} style={BannerStyles.bannerImageHome} source={require('../images/home_logo.png')}/>
          <IntroScreen
            introText={introText}
            language={language}
            visible={showIntro}
            onClose={toggleIntro}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => { setLanguage('en') } }>
        <View style={BannerStyles.bannerImageContainer}>
          <Image resizeMode={'contain'} style={ language === 'en' ? BannerStyles.selectedLanguage : BannerStyles.bannerImage } source={require('../images/us_flag.png')}/>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Banner

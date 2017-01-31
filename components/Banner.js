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

const Banner = (props: Object) => {
  let { language, setLanguage } = props;
  return(
    <View style={BannerStyles.bannerContainer}>
      <TouchableOpacity onPress={() => { setLanguage('fr') } }>
        <View style={BannerStyles.bannerImageContainer}>
          <Image resizeMode={'contain'} style={ language === 'fr' ? BannerStyles.selectedLanguage : BannerStyles.bannerImage } source={require('../images/fr_flag.png')}/>
        </View>
      </TouchableOpacity>
      <View style={BannerStyles.bannerImageContainer}>
        <Image resizeMode={'contain'} style={BannerStyles.bannerImage} source={require('../images/home_logo.png')}/>
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

/* @flow */

// React
import React, {Component, createRef} from 'react';

// React Native
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';

// Video Component
import Video from 'react-native-video';

import HomeLogo from '../images/home_logo.png';

// Stylesheets
import {ModalStyles, VideoStyles, ButtonStyles} from '../styles/Styles';

export default class VideoModal extends Component {
  state = {
    videoLoaded: false,
    enVideoPaused: false,
    frVideoPaused: false,
    transitionVals: {en: new Animated.Value(1), fr: new Animated.Value(1)},
  };

  constructor(props: Object): void {
    super(props);
    (this: any).sortVideo = this.sortVideo.bind(this);
    (this: any).handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    (this: any).handlePlayback = this.handlePlayback.bind(this);
    this.animateIn = this.animateIn.bind(this);
    this.animateOut = this.animateOut.bind(this);
    this.animateTransition = this.animateTransition.bind(this);
    this.handleOnPress = this.handleOnPress.bind(this);
    this.frPlayer = createRef();
    this.enPlayer = createRef();
  }

  sortVideo(): Array<Object> {
    let {videoModalContent} = this.props;
    let {en, fr} = videoModalContent;
    let videos = [
      {
        url: fr.video_url,
        ref: this.frPlayer,
        lang: 'fr',
        title: fr.title,
      },
      {
        url: en.video_url,
        ref: this.enPlayer,
        lang: 'en',
        title: en.title,
      },
    ];
    if (this.props.language === 'fr') return videos.reverse();
    return videos;
  }

  handleOnEnd(lang) {
    const player = lang === 'en' ? this.enPlayer : this.frPlayer;
    const {current} = player;
    if (current) {
      current.seek(0);
      this.handlePlayback(lang, true);
    }
  }

  handleOnLoad(lang: string): void {
    this.handlePlayback(lang, true);
  }

  handlePlayback(lang: string, override?: boolean): void {
    let {enVideoPaused, frVideoPaused, transitionVals} = this.state;
    if (lang === 'en') {
      this.setState({enVideoPaused: override ? override : !enVideoPaused});
    } else {
      this.setState({frVideoPaused: override ? override : !frVideoPaused});
    }
  }

  handleOnPress(lang) {
    this.animateTransition(lang, () => this.handlePlayback(lang));
  }

  animateIn(lang) {
    const {transitionVals} = this.state;
    return Animated.timing(transitionVals[lang], {toValue: 1.0, duration: 200});
  }

  animateOut(lang) {
    const {transitionVals} = this.state;
    return Animated.timing(transitionVals[lang], {
      toValue: 0.95,
      duration: 200,
    });
  }

  animateTransition(lang, cb) {
    Animated.sequence([this.animateOut(lang), this.animateIn(lang)]).start(cb);
  }

  render() {
    const {
      videoModalContent,
      displayModal,
      toggleModal,
      layoutAspect,
      language,
    } = this.props;
    const {enVideoPaused, frVideoPaused, transitionVals} = this.state;
    const exitModal = () => {
      this.handlePlayback('en', true);
      this.handlePlayback('fr', true);
      toggleModal(videoModalContent, false);
    };
    const videoPlayerContainerStyle =
      layoutAspect === 'LAYOUT_PORTRAIT'
        ? VideoStyles.videoPlayerContainerPortrait
        : VideoStyles.videoPlayerContainerLandscape;
    return (
      <Modal
        animationType={'fade'}
        transparent={false}
        visible={displayModal}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={exitModal}>
        <View
          style={
            layoutAspect === 'LAYOUT_PORTRAIT'
              ? ModalStyles.videoModalPortrait
              : ModalStyles.videoModalLandscape
          }>
          <View
            style={
              layoutAspect === 'LAYOUT_PORTRAIT'
                ? ButtonStyles.buttonMenuContainerRow
                : ButtonStyles.buttonMenuContainerCol
            }>
            <TouchableOpacity
              onPress={exitModal}
              style={ButtonStyles.backButton}>
              <Text style={ButtonStyles.backButtonText}>
                {language === 'en' ? 'back' : 'retour'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={exitModal}
              style={ButtonStyles.downloadButtonContainer}>
              <Image
                style={ButtonStyles.downloadButton}
                source={require('../images/cloud-download.png')}
              />
            </TouchableOpacity>
          </View>
          {this.sortVideo().map((video, index) => (
            <TouchableOpacity
              key={index}
              style={VideoStyles.touchableVideo}
              activeOpacity={1}
              onPress={() => this.handleOnPress(video.lang)}>
              <Animated.View
                style={{
                  ...videoPlayerContainerStyle,
                  flex: transitionVals[video.lang],
                }}>
                <Video
                  style={
                    layoutAspect === 'LAYOUT_PORTRAIT'
                      ? VideoStyles.videoPlayerPortrait
                      : VideoStyles.videoPlayerLandscape
                  }
                  source={{uri: video.url}}
                  ref={video.ref}
                  key={video.url}
                  onError={error => console.log(error)}
                  resizeMode={
                    layoutAspect === 'LAYOUT_PORTRAIT' ? 'cover' : 'contain'
                  }
                  posterResizeMode={
                    layoutAspect === 'LAYOUT_PORTRAIT' ? 'cover' : 'contain'
                  }
                  paused={video.lang === 'en' ? enVideoPaused : frVideoPaused}
                  onTimedMetadata={event => console.log(event)}
                  onLoad={() => this.handleOnLoad(video.lang)}
                  onEnd={() => this.handleOnEnd(video.lang)}
                  hideShutterView={true}
                  poster={
                    Image.resolveAssetSource(
                      require('../images/asl-lsf-poster-background.png'),
                    ).uri
                  }
                />
                <View style={VideoStyles.videoTitleContainer}>
                  <Image
                    resizeMode="contain"
                    style={VideoStyles.videoImage}
                    source={
                      video.lang === 'en'
                        ? require('../images/us_flag.png')
                        : require('../images/fr_flag.png')
                    }
                  />
                  <Text style={VideoStyles.videoTitle}>{video.title}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  }
}

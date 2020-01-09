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
    fadeVals: {en: new Animated.Value(1), fr: new Animated.Value(1)},
  };

  constructor(props: Object): void {
    super(props);
    (this: any).sortVideo = this.sortVideo.bind(this);
    (this: any).handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    (this: any).handlePlayback = this.handlePlayback.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.animateFade = this.animateFade.bind(this);
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
    let {enVideoPaused, frVideoPaused, fadeVals} = this.state;
    if (lang === 'en') {
      this.setState({enVideoPaused: override ? override : !enVideoPaused}, () =>
        this.animateFade(lang),
      );
    } else {
      this.setState({frVideoPaused: override ? override : !frVideoPaused}, () =>
        this.animateFade(lang),
      );
    }
  }

  fadeOut(lang) {
    const {fadeVals} = this.state;
    return Animated.timing(fadeVals[lang], {toValue: 0, duration: 500});
  }

  fadeIn(lang) {
    const {fadeVals} = this.state;
    return Animated.timing(fadeVals[lang], {toValue: 1, duration: 500});
  }

  animateFade(lang) {
    this.fadeOut(lang).start(this.fadeIn().start());
  }

  render() {
    const {
      videoModalContent,
      displayModal,
      toggleModal,
      layoutAspect,
      language,
    } = this.props;
    const {enVideoPaused, frVideoPaused, fadeVals} = this.state;
    const exitModal = () => {
      this.handlePlayback('en', true);
      this.handlePlayback('fr', true);
      toggleModal(videoModalContent, false);
    };
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
              onPress={() => this.handlePlayback(video.lang)}>
              <Animated.View
                style={{
                  ...VideoStyles.videoPlayerContainer,
                  opacity: fadeVals[video.lang],
                }}>
                <Video
                  style={VideoStyles.videoPlayer}
                  source={{uri: video.url}}
                  ref={video.ref}
                  key={video.url}
                  onError={error => console.log(error)}
                  resizeMode="cover"
                  posterResizeMode="cover"
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

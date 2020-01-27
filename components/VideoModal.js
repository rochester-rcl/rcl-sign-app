/* @flow */

// React
import React, {Component, createRef} from 'react';

// React Native
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Animated,
  Button,
} from 'react-native';

// Components
import Video from 'react-native-video';
import OfflineDownload, {OfflineDownloadContext} from './OfflineDownload';
import VideoCaptions from './VideoCaptions';

// Stylesheets
import {ModalStyles, VideoStyles, ButtonStyles} from '../styles/Styles';

export default class VideoModal extends Component {
  state = {
    videoLoaded: false,
    enVideoPaused: false,
    frVideoPaused: false,
    transitionVals: {en: new Animated.Value(1), fr: new Animated.Value(1)},
    sentenceMode: false,
  };
  constructor(props) {
    super(props);
    this.sortVideo = this.sortVideo.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handlePlayback = this.handlePlayback.bind(this);
    this.animateIn = this.animateIn.bind(this);
    this.animateOut = this.animateOut.bind(this);
    this.animateTransition = this.animateTransition.bind(this);
    this.handleOnPress = this.handleOnPress.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleShowSentence = this.handleShowSentence.bind(this);
    this.renderSentenceButton = this.renderSentenceButton.bind(this);
    this.getCurrentVideos = this.getCurrentVideos.bind(this);
    this.frPlayer = createRef();
    this.enPlayer = createRef();
  }

  getCurrentVideos() {
    const {videoModalContent} = this.props;
    const {sentenceMode} = this.state;
    const {en, fr} = videoModalContent;
    const enVideo = {url: en.videoUrl, captions: null};
    const frVideo = {url: fr.videoUrl, captions: null};
    if (sentenceMode) {
      if (en.sentence.videoUrl) {
        enVideo.url = en.sentence.videoUrl;
      }
      if (en.sentence.captions) {
        enVideo.captions = en.sentence.captions;
      }
      if (fr.sentence.videoUrl) {
        frVideo.url = fr.sentence.videoUrl;
      }
      if (fr.sentence.captions) {
        frVideo.captions = fr.sentence.captions;
      }
    }
    return [enVideo, frVideo];
  }

  sortVideo() {
    const {videoModalContent} = this.props;
    const {en, fr} = videoModalContent;
    const [enVideo, frVideo] = this.getCurrentVideos();
    const videos = [
      {
        url: frVideo.url,
        ref: this.frPlayer,
        lang: 'fr',
        title: fr.title,
        captions: frVideo.captions,
      },
      {
        url: enVideo.url,
        ref: this.enPlayer,
        lang: 'en',
        title: en.title,
        captions: enVideo.captions,
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

  handleOnLoad(lang) {
    this.handlePlayback(lang, true);
  }

  handleDownload() {
    const {onDownloadRequested} = this.context;
    const {display, ...rest} = this.props.videoModalContent;
    onDownloadRequested(rest);
  }

  handlePlayback(lang, override) {
    let {enVideoPaused, frVideoPaused} = this.state;
    if (lang === 'en') {
      this.setState({enVideoPaused: override ? override : !enVideoPaused});
    } else {
      this.setState({frVideoPaused: override ? override : !frVideoPaused});
    }
  }

  handleShowSentence() {
    this.setState(prevState => ({sentenceMode: !prevState.sentenceMode}));
  }

  checkForSentences(videoModalContent) {
    const {en, fr} = videoModalContent;
    if (en && en) {
      if (!en.sentence.videoUrl) return false;
    }
    if (fr) {
      if (!fr.sentence.videoUrl) return false;
    }
    return true;
  }

  handleOnPress(lang) {
    this.animateTransition(lang, () => this.handlePlayback(lang));
  }

  animateIn(lang) {
    const {transitionVals} = this.state;
    return Animated.timing(transitionVals[lang], {toValue: 1.0, duration: 100});
  }

  animateOut(lang) {
    const {transitionVals} = this.state;
    return Animated.timing(transitionVals[lang], {
      toValue: 0.95,
      duration: 100,
    });
  }

  animateTransition(lang, cb) {
    Animated.sequence([this.animateOut(lang), this.animateIn(lang)]).start(cb);
  }

  getId(modalContent) {
    const {en} = modalContent;
    return en.definitionId;
  }

  renderSentenceButton() {
    const {videoModalContent} = this.props;
    if (this.checkForSentences(videoModalContent)) {
      return (
        <TouchableOpacity
          style={ButtonStyles.sentenceButtonContainer}
          onPress={this.handleShowSentence}>
          <Image
            style={ButtonStyles.sentenceButton}
            resizeMode={'contain'}
            source={require('../images/asl-icon.png')}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      videoModalContent,
      displayModal,
      toggleModal,
      layoutAspect,
      language,
    } = this.props;
    const {sentenceMode} = this.state;
    const offlineDownloads = this.context ? this.context.offlineDownloads : {};
    const id = this.getId(videoModalContent);

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
            {this.renderSentenceButton()}
            <OfflineDownload
              onDownloadRequested={this.handleDownload}
              status={offlineDownloads[id]}
            />
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
                  source={{
                    uri: video.url,
                  }}
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
                <VideoCaptions captions={video.captions} />
              </Animated.View>
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
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  }
}

VideoModal.contextType = OfflineDownloadContext;

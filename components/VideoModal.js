/* @flow */

// React
import React, { Component } from 'react';

// React Native
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';

// Video Component
import Video from 'react-native-video';

// Stylesheets
import { ModalStyles, VideoStyles } from '../styles/Styles';

export default class VideoModal extends Component {
  state = {
    videoLoaded: false,
    enVideoPaused: false,
    frVideoPaused: false,
    layoutAnimation: new Animated.Value(0),
  };

  constructor(props: Object): void {
    super(props);
    (this: any).sortVideo = this.sortVideo.bind(this);
    (this: any).handleOnLoad = this.handleOnLoad.bind(this);
    (this: any).handlePlayback = this.handlePlayback.bind(this);
    (this: any).handleOnEnd = this.handleOnEnd.bind(this);
  }

  sortVideo(): Array<Object> {
    let { videoModalContent } = this.props;
    let { en, fr } = videoModalContent;
    let videos = [
      {
        url: fr.video_url,
        ref: (ref) => { this.frPlayer = ref },
        lang: 'fr',
        title: fr.title,
      },
      {
        url: en.video_url,
        ref: (ref) => { this.enPlayer = ref },
        lang: 'en',
        title: en.title,
      }
    ];
    if (this.props.language === 'fr') return videos.reverse();
    return videos;
  }

  handleOnLoad(lang: string): void {
    this.handlePlayback(lang, true);
  }

  handlePlayback(lang: string, override?: boolean): void {
    let { enVideoPaused, frVideoPaused } = this.state;
    if (lang === 'en') {
      this.setState({ enVideoPaused: override ? override : !enVideoPaused });
    } else {
      this.setState({ frVideoPaused: override ? override : !frVideoPaused });
    }
  }

  handleOnEnd(lang: string): void {
    if (lang === 'en') {
      this.enPlayer.seek(0);
    } else {
      this.frPlayer.seek(0);
    }
    this.handlePlayback(lang, true);
  }

  render() {
    const { videoModalContent, displayModal, toggleModal, layoutAspect } = this.props;
    const { enVideoPaused, frVideoPaused, layoutAnimation } = this.state;
    const exitModal = () => {
      this.handlePlayback('en', true);
      this.handlePlayback('fr', true);
      toggleModal(videoModalContent, false);
    }

    return(
      <Modal
        animationType={"fade"}
        transparent={false}
        visible={displayModal}
        onRequestClose={exitModal}>
        <View
          style={
            layoutAspect === 'LAYOUT_PORTRAIT' ? ModalStyles.videoModalPortrait :
            ModalStyles.videoModalLandscape
          }
        >
          {this.sortVideo().map((video, index) =>
            <TouchableOpacity
              key={index}
              style={VideoStyles.touchableVideo}
              onPress={() => this.handlePlayback(video.lang)}>
              <Video
                style={VideoStyles.videoPlayer}
                source={{ uri: video.url }}
                ref={video.ref}
                onError={(error) => console.log(error)}
                resizeMode='contain'
                paused={video.lang === 'en' ? enVideoPaused : frVideoPaused}
                onTimedMetadata={(event) => console.log(event)}
                onLoad={() => this.handleOnLoad(video.lang)}
                onEnd={() => this.handleOnEnd(video.lang)} />
              <View style={VideoStyles.videoTitleContainer}>
                <Image
                  resizeMode={'cover'}
                  style={ VideoStyles.videoImage }
                  source={video.lang === 'en' ? require('../images/us_flag.png')
                          : require('../images/fr_flag.png')}/>
                <Text style={VideoStyles.videoTitle}>{video.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          </View>
        </Modal>
    );
  }
}

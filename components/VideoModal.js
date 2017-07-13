/* @flow */

// React
import React, { Component } from 'react';

// React Native
import {
  Text,
  View,
  Modal,
} from 'react-native';

// Video Component
import Video from 'react-native-video';

// Stylesheets
import { ModalStyles, VideoStyles } from '../styles/Styles';

export default class VideoModal extends Component {
  state = { videoLoaded: false, enVideoPaused: true, frVideoPaused: true };
  constructor(props): void {
    super(props);
    (this: any).sortVideo = this.sortVideo.bind(this);
    (this: any).handleOnLoad = this.handleOnLoad.bind(this);
  }

  sortVideo(): Array<string> {
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
  handleOnLoad(): void {

  }
  render() {
    const { videoModalContent, displayModal, toggleModal } = this.props;
    const { enVideoPaused, frVideoPaused } = this.state;
    const exitModal = () => toggleModal(videoModalContent, false);
    return(
      <Modal
        animationType={"fade"}
        transparent={false}
        style={ModalStyles.letterPickerModal}
        visible={displayModal}
        onRequestClose={exitModal}>
          {this.sortVideo().map((video, index) =>
              <Video
                key={index}
                style={VideoStyles.videoPlayer}
                source={ {uri: video.url} }
                ref={video.ref}
                onError={(error) => console.log(error, video.url)}
                resizeMode="cover"
                paused={video.lang === 'en' ? enVideoPaused : frVideoPaused}
                onTimedMetadata={(event) => console.log(event)}
                onLoad={this.handleOnLoad} />
          )}
        </Modal>
    );
  }
}

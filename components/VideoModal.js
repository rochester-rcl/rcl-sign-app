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

  constructor(props): void {
    super(props);
    (this: any).sortVideo = this.sortVideo.bind(this);
    (this: any).handleOnLoad = this.handleOnLoad.bind(this);
  }

  sortVideo(): Array<string> {
    let { enVideo, frVideo } = this.props;

    let videos = [
      {
        url: frVideo,
        ref: (ref) => { this.frPlayer = ref },
      },
      {
        url: enVideo,
        ref: (ref) => { this.enPlayer = ref },
      }
    ];
    if (this.props.language === 'fr') return videos.reverse();
    return videos;
  }
  handleOnLoad(): void {
    this.enPlayer.presentFullscreenPlayer();
  }
  render() {
    const { enVideo, frVideo, displayModal, toggleModal } = this.props;
    const exitModal = () => toggleModal({en: enVideo, fr: frVideo}, false);
    return(
      <Modal
        animationType={"fade"}
        transparent={false}
        style={ModalStyles.letterPickerModal}
        visible={displayModal}
        onRequestClose={exitModal}>
          {this.sortVideo().map((video, index) =>
            <Video
              style={VideoStyles.videoPlayer}
              source={ {uri: video.url} }
              ref={video.ref}
              onError={(error) => console.log(error, video.url)}
              resizeMode="cover"
              onTimedMetadata={(event) => console.log(event)}
              onLoad={this.handleOnLoad} />
          )}
        </Modal>
    );
  }
}

/* @flow */

// React
import React, {Component} from 'react';

// React Native
/*
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet
} from 'react-native';

// Video Component
import Video from 'react-native-video';
*/
// Stylesheets
import {ModalStyles, VideoStyles, ButtonStyles} from '../styles/Styles';
import {Button, Icon, Search, Modal} from 'semantic-ui-react';

export default class VideoModal extends Component {
  state = {
    videoLoaded: false,
    enVideoPaused: false,
    frVideoPaused: false,
    //layoutAnimation: new Animated.Value(0)
  };

  constructor(props : Object): void {
    super(props);
    (this : any).sortVideo = this.sortVideo.bind(this);
    (this : any).handleOnLoad = this.handleOnLoad.bind(this);
    (this : any).handlePlayback = this.handlePlayback.bind(this);
    (this : any).handleOnPause = this.handleOnPause.bind(this);
    (this : any).handleOnEnd = this.handleOnEnd.bind(this);
  }

  sortVideo(): Array<Object> {
    let {videoModalContent} = this.props;
    let {en, fr} = videoModalContent;
    let videos = [
      {
        url: fr.video_url,
        ref: (ref) => {
          this.frPlayer = ref
        },
        lang: 'fr',
        title: fr.title
      }, {
        url: en.video_url,
        ref: (ref) => {
          this.enPlayer = ref
        },
        lang: 'en',
        title: en.title
      }
    ];
    if (this.props.language === 'fr')
      return videos.reverse();
    return videos;
  }

  handleOnLoad(lang : string): void {
    this.handlePlayback(lang, true);
  }

  handlePlayback(lang : string, override? : boolean): void {
    let {enVideoPaused, frVideoPaused} = this.state;
    if (lang === 'en') {
      this.setState({
        enVideoPaused: override
          ? override
          : !enVideoPaused
      });
    } else {
      this.setState({
        frVideoPaused: override
          ? override
          : !frVideoPaused
      });
    }
  }

  handleOnPause(lang: string):void {
    let {enVideoPaused, frVideoPaused} = this.state;
    if (lang === 'en') {
      enVideoPaused
    }else{
      frVideoPaused
    }
  }

  handleOnEnd(lang : string): void {
    if (lang === 'en') {
      this.enPlayer.seek(0);
    } else {
      this.frPlayer.seek(0);
    }
    this.handlePlayback(lang, true);
  }

  render() {
    const {videoModalContent, displayModal, toggleModal, layoutAspect, language} = this.props;
    const {enVideoPaused, frVideoPaused, /*layoutAnimation*/} = this.state;
    const exitModal = () => {
      this.handlePlayback('en', true);
      this.handlePlayback('fr', true);
      toggleModal(videoModalContent, false);
    };

    return (
      <div>
      <Modal>
        <Button onClick={exitModal}>
          <p style={ButtonStyles.backButtonText}>
            {
              language === 'en'
                ? 'back'
                : 'retour'
            }
          </p>
        </Button>
        {
          this.sortVideo().map((video, index) =>
          <Button key={index} onClick={() => this.handlePlayback(video.lang)}>
            <video
              style={VideoStyles.videoPlayer}
              source={{
                uri: video.url
              }}
              ref={video.ref}
              onError={(error) => console.log(error)}
              onPause={() => this.handleOnPause(video.lang)}
              onLoadedMetadata={(event) => console.log(event)}
              onLoad={() => this.handleOnLoad(video.lang)}
              onEnded={() => this.handleOnEnd(video.lang)}>

            </video>

            {/*}<div style={VideoStyles.videoTitleContainer}>
            <img
              resizeMode={'cover'}
              source={video.lang === 'en'
                ? require('../images/us_flag.png')
                : require('../images/fr_flag.png')}/>
              <p>{video.title}</p>
            </div>*/}
          </Button>)
        }
      </Modal>
    </div>);
  }
}

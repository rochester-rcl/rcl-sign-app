/* @flow */

// React
import React, { Component } from "react";

// React Native

import {
  Modal,
  Button,
  Container,
  Header,
  Segment,
  Grid,
  Card,
  Image
} from "semantic-ui-react";

// Stylesheets
import { ModalStyles, VideoStyles, ButtonStyles } from "../styles/Styles";

// VideoPlayer Component
import VideoPlayer from "./VideoPlayer";

export default class VideoModal extends Component {
  state = {
    videoLoaded: false,
    enVideoPaused: false,
    frVideoPaused: false
    //layoutAnimation: new Animated.Value(0)
  };

  constructor(props: Object): void {
    super(props);
    (this: any).sortVideo = this.sortVideo.bind(this);
    (this: any).exitModal = this.exitModal.bind(this);
  }

  sortVideo(): Array<Object> {
    let { videoModalContent } = this.props;
    let { en, fr } = videoModalContent;
    let videos = [
      {
        url: fr.video_url,
        lang: "fr",
        title: fr.title
      },
      {
        url: en.video_url,
        lang: "en",
        title: en.title
      }
    ];
    if (this.props.language === "fr") return videos.reverse();
    return videos;
  }

  exitModal() {
    const { videoModalContent, toggleModal } = this.props;
    toggleModal(videoModalContent, false);
  }

  render() {
    const {
      videoModalContent,
      displayModal,
      toggleModal,
      layoutAspect,
      language
    } = this.props;
    const { enVideoPaused, frVideoPaused /*layoutAnimation*/ } = this.state;

    return (
      <Modal closeIcon open={displayModal} onClose={this.exitModal}>
        <Modal.Content>
          <Card.Group centered>
            {this.sortVideo().map((video, index) => (
              <Card className="lsf-video-modal-card" key={index}>
                <Card.Content>
                  <Card.Header className="lsf-app-card-header">
                    <Image
                      floated="left"
                      size="mini"
                      src={
                        video.lang === "en"
                          ? require("../images/us_flag.png")
                          : require("../images/fr_flag.png")
                      }
                    />
                    {video.title}
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <VideoPlayer
                    className="dict-video"
                    ref={video.ref}
                    src={video.url}
                  />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Modal.Content>
      </Modal>
    );
  }
}

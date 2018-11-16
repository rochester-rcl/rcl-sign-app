/* @flow */

// React
import React, {Component} from 'react';

// React Native

import {
  Modal,
  Button,
  Container,
  Header,
  Segment,
  Grid,
  Image
} from 'semantic-ui-react';

// Stylesheets
import {ModalStyles, VideoStyles, ButtonStyles} from '../styles/Styles';

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
    (this : any).handleOnEnd = this.handleOnEnd.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.nextProps);
  }
  sortVideo(): Array<Object> {
    console.log(this.props);
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
      <Modal
        closeIcon 
        open={displayModal}
        onClose={exitModal}>
        <Header
          content='FSL-ASL'/>
        <Modal.Content>
          <Grid
            container
            columns='equal'>
            <Grid.Row>
            {
              this.sortVideo().map((video, index) =>
                <Grid.Column
                  width={8}
                  key={index}>
                  {/*<Button
                    onClick={() => this.handlePlayback(video.lang)}>
                    something
                  </Button>*/}
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <Image
                          size='tiny'
                          src={video.lang === 'en'
                            ? require('../images/us_flag.png')
                            : require('../images/fr_flag.png')}/>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Header
                          size="medium"
                          color="blue"
                          content={video.title}/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <video
                    controls
                    src={video.url}
                    ref={video.ref}
                    onError={(error) => console.log(error)}
                    onLoad={() => this.handleOnLoad(video.lang)}/>
                </Grid.Column>
              )
            }
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            inverted
            onClick={exitModal}>
            {
              language === 'en'
              ? 'back'
              : 'retour'
            }
          </Button>
        </Modal.Actions>
    </Modal>);
  }
}

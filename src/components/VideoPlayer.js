/* @flow */

import React, { Component } from "react";

// semantic ui

import { Button, Icon } from "semantic-ui-react";

export default class Intro extends Component {
  state = {
    paused: true,
    showCaptions: false,
    fullscreen: false,
    alternateSrcSelected: false,
  };

  constructor(props: Object) {
    super(props);
    this.togglePause = this.togglePause.bind(this);
    this.toggleCaptions = this.toggleCaptions.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
    this.pause = this.pause.bind(this);
    this.showCaptions = this.showCaptions.bind(this);
    this.createVTTCaptionsFromString = this.createVTTCaptionsFromString.bind(this);
    this.toggleAlternateSrc = this.toggleAlternateSrc.bind(this);
    this.setSrc = this.setSrc.bind(this);
    this.fullscreen = this.fullscreen.bind(this);
    this.isFullscreen = this.isFullscreen.bind(this);
    this.hasCaptions = this.hasCaptions.bind(this);
    this.resetPlayer = this.resetPlayer.bind(this);
  }

  componentDidMount() {
    this.playerContainer.addEventListener(
      "webkitfullscreenchange",
      this.handleFullscreenChange
    );
    this.playerContainer.addEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );
    this.playerContainer.addEventListener(
      "mozfullscreenchange",
      this.handleFullscreenChange
    );
    this.player.addEventListener("ended", this.resetPlayer);
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    const { paused, showCaptions, fullscreen } = this.state;
    const { src } = this.props;
    if (paused !== prevState.paused) {
      this.pause(paused);
    }

    if (showCaptions !== prevState.showCaptions) {
      this.showCaptions(showCaptions);
    }

    if (src !== prevProps.src) {
      this.setSrc(src);
    }


  }

  togglePause() {
    this.setState({
      paused: !this.state.paused
    });
  }

  resetPlayer() {
    this.setState({
      paused: true
    }, () => this.player.currentTime = 0);
  }

  toggleCaptions() {
    this.setState({
      showCaptions: !this.state.showCaptions
    });
  }

  toggleFullscreen(event, obj, stateOnly) {
    const fullscreen = this.isFullscreen();
    if (!stateOnly) {
      this.fullscreen(!fullscreen);
      this.setState({
        fullscreen: !fullscreen
      });
    } else {
      this.setState({
        fullscreen: fullscreen
      });
    }
  }

  toggleAlternateSrc() {
    const { alternateSrcSelected } = this.state;
    const { alternateSrc, src } = this.props;
    if (alternateSrcSelected === false) {
      if (this.alternateTrack !== undefined) {
        this.alternateTrack.mode = 'hidden';
      }
      this.setState({
        alternateSrcSelected: true,
        showCaptions: false,
      }, () => this.setSrc(alternateSrc.video_url))
    } else {
      if (this.alternateTrack !== undefined) {
        this.alternateTrack.mode = 'disabled';
      }
      this.setState({
        showCaptions: false,
        alternateSrcSelected: false,
      }, () => this.setSrc(src))
    }
  }

  handleFullscreenChange(event, obj) {
    // specifically handling 'esc' in fullscreen mode
    const { fullscreen } = this.state;
    const isFullscreen = this.isFullscreen();
    if (fullscreen !== isFullscreen) {
      this.toggleFullscreen(event, obj, true);
    }
  }

  pause(val: boolean) {
    if (this.player !== undefined) {
      if (val) {
        this.player.pause();
      } else {
        this.player.play();
      }
    }
  }

  isFullscreen(): boolean {
    let element;

    if (document.webkitFullscreenElement !== undefined) {
      element = document.webkitFullscreenElement;
    }

    if (document.fullscreenElement !== undefined) {
      element = document.fullscreenElement;
    }

    if (document.mozFullscreenElement !== undefined) {
      element = document.mozFullscreenElement;
    }

    if (document.msFullscreenElement !== undefined) {
      element = document.msFullscreenElement;
    }

    if (element === this.playerContainer) {
      return true;
    }
    return false;
  }

  hasCaptions() {
    const { captions, alternateSrc } = this.props;
    const { alternateSrcSelected } = this.state;
    if (alternateSrcSelected) {
      if (alternateSrc.captions !== null) return true;
    } else {
      if (captions !== undefined) return true;
    }
    return false;
  }

  fullscreen(val: boolean) {
    const elem = this.playerContainer;
    if (val === true) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }

      if (elem.mozRequestFullscreen) {
        elem.mozRequestFullscreen();
      }

      if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }

      if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }

      if (document.mozExitFullscreen) {
        document.mozExitFullscreen();
      }

      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }

      if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  showCaptions() {
    const { captions, alternateSrc } = this.props;
    const { alternateSrcSelected, showCaptions } = this.state;
    let _captions;
    if (alternateSrcSelected === true && alternateSrc.captions !== null) {
      _captions = alternateSrc.captions;
    } else {
      _captions = captions;
    }

    if (!_captions) return;

    let track;
    if (_captions.includes('http')) {
      track = this.player.textTracks[0];
    } else {
      if (this.player.textTracks.length === 0) {
        track = this.createVTTCaptionsFromString(_captions);
      } else {
        // in case we have the original captions + the alternate
        track = this.player.textTracks[1];
        if (track === undefined) {
          track = this.player.textTracks[0];
        }
      }
    }

    if (showCaptions === true) {
      track.mode = 'showing';
    } else {
      track.mode = 'hidden';
    }
  }

  // don't know the actual type
  createVTTCaptionsFromString(captions: string): TextTrack {
    const { language } = this.props;
    const captionsLang = (language === 'en') ? 'English' : 'French';
    const track = this.player.addTextTrack("captions", captionsLang, language);
    const cue = new VTTCue(0, this.player.duration, captions);
    this.alternateTrack = track;
    track.addCue(cue);
    return track;
  }

  setSrc(src) {
    if (this.player !== undefined) {
      this.player.setAttribute('src', src);
      this.player.load();
    }
  }

  render() {
    const { src, captions, className, id, alternateSrc, poster } = this.props;
    const { paused, fullscreen, alternateSrcSelected } = this.state;
    let _className = "lsf-app-video-container ";
    _className += className !== undefined ? className : "";
    _className += (fullscreen === true) ? " fullscreen" : "";
    return (
      <div
        ref={ref => (this.playerContainer = ref)}
        className={_className}
      >
        <video id={id} ref={ref => (this.player = ref)} className="lsf-app-video" poster={poster}>
          <source src={src} />
          {(captions !== undefined) ? <track label="English" kind="captions" srcLang="en" src={captions} default /> : null}
        </video>
        <div className="lsf-app-video-controls">
          <Button
            className="lsf-app-video-button play"
            circular
            icon
            title="toggle play / pause"
            size="big"
            onClick={this.togglePause}
          >
            <Icon name={paused === true ? "play" : "pause"} />
          </Button>
          <Button
            className="lsf-app-video-button fullscreen"
            circular
            icon
            title="toggle fullscreen"
            size="big"
            onClick={this.toggleFullscreen}
          >
            <Icon name={fullscreen === true ? "compress" : "expand"} />
          </Button>
          {(alternateSrc !== undefined && alternateSrc.video_url !== null) ?
            <Button
              className="lsf-app-video-button toggle-src"
              circular
              icon
              title="toggle word / sentence"
              size="big"
              onClick={this.toggleAlternateSrc}
            >
              <Icon
                name="sign language"
              />
            </Button> : null
          }
          {(this.hasCaptions() === true) ?
            <Button
              className="lsf-app-video-button captions"
              circular
              icon
              title="toggle captions"
              size="big"
              onClick={this.toggleCaptions}
            >
              <Icon
                name="closed captioning"
              />
            </Button> : null
          }
        </div>
      </div>
    );
  }
}

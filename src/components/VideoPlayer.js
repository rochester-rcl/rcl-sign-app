/* @flow */

import React, { Component } from "react";

// semantic ui

import { Button, Icon } from "semantic-ui-react";

export default class Intro extends Component {
  state = {
    paused: true,
    showCaptions: false,
    fullscreen: false
  };

  constructor(props: Object) {
    super(props);
    this.togglePause = this.togglePause.bind(this);
    this.toggleCaptions = this.toggleCaptions.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
    this.pause = this.pause.bind(this);
    this.showCaptions = this.showCaptions.bind(this);
    this.setSrc = this.setSrc.bind(this);
    this.fullscreen = this.fullscreen.bind(this);
    this.isFullscreen = this.isFullscreen.bind(this);
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
      if (!this.player.paused) {
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

  showCaptions() {}

  setSrc(src) {
    if (this.player !== undefined) {
      this.player.setAttribute('src', src);
      this.player.load();
    }
  }

  render() {
    const { src, captions, className, id } = this.props;
    const { paused, fullscreen } = this.state;
    let _className = "lsf-app-video-container ";
    _className += className !== undefined ? className : "";
    _className += (fullscreen === true) ? " fullscreen" : "";
    return (
      <div
        ref={ref => (this.playerContainer = ref)}
        className={_className}
      >
        <video id={id} ref={ref => (this.player = ref)} className="lsf-app-video">
          <source src={src} />
          {(captions !== undefined) ? <track label="English" kind="captions" srcLang="en" src={captions} default /> : null}
        </video>
        <div className="lsf-app-video-controls">
          <Button
            className="lsf-app-video-button play"
            circular
            icon
            size="big"
            onClick={this.togglePause}
          >
            <Icon name={paused === true ? "play" : "pause"} />
          </Button>
          <Button
            className="lsf-app-video-button fullscreen"
            circular
            icon
            size="big"
            onClick={this.toggleFullscreen}
          >
            <Icon name={fullscreen === true ? "compress" : "expand"} />
          </Button>
        </div>
      </div>
    );
  }
}

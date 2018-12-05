/* @flow */
import React, { Component } from "react";

// semantic ui react
import {
  Segment,
  Card,
  Modal,
  List,
  Image,
  Flag,
  Icon,
  Button
} from "semantic-ui-react";

// Components
import VideoPlayer from "./VideoPlayer";

class EtymologyDisplay extends Component {
  state = {
    active: false,
    mainVideoActive: false,
    secondaryVideoActive: false
  };

  constructor(props: Object) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
    (this: any).toggleMainVideo = this.toggleMainVideo.bind(this);
    (this: any).toggleSecondaryVideo = this.toggleSecondaryVideo.bind(this);
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }

  toggleMainVideo() {
    this.setState({
      mainVideoActive: !this.state.mainVideoActive
    });
  }

  toggleSecondaryVideo() {
    this.setState({
      secondaryVideoActive: !this.state.secondaryVideoActive
    });
  }

  render() {
    const { engEtymology, frEtymology } = this.props.etymology;
    const { language } = this.props;
    const { active, secondaryVideoActive, mainVideoActive } = this.state;
    const mainEtymology = language === "en" ? frEtymology : engEtymology;
    const secondaryEtymology = language === "en" ? engEtymology : frEtymology;
    // TODO update semantic ui
    const mainDescription =
      language === "en"
        ? engEtymology.descriptionEn
        : engEtymology.descriptionFr;
    const mainFlag = language === "en" ? "us" : "fr";
    const secondaryFlag = language === "en" ? "fr" : "us";
    return (
      <div className="lsf-etymology-term" onClick={this.handleClick}>
        <h3 className="lsf-etymology-term-title">
          {secondaryEtymology.title + " / " + mainEtymology.title}
        </h3>
        <Modal
          className="lsf-etymology-term-modal"
          open={active}
          closeIcon="close"
          onClose={this.handleClick}
          closeOnDimmerClick={false}
          closeOnDocumentClick={false}
        >
          <Modal.Content className="lsf-etymology-display">
            <Card.Group centered>
              <Card>
                {mainVideoActive === true ? (
                  <VideoPlayer src={mainEtymology.video_url} />
                ) : (
                  <Image src={mainEtymology.imageUrl} />
                )}
                <Card.Content>
                  <Card.Header className="lsf-app-card-header">
                    {!mainEtymology.video_url ? null : (
                      <Button icon onClick={this.toggleMainVideo}>
                        <Icon
                          size="large"
                          name="film"
                          onClick={this.toggleMainVideo}
                        />
                      </Button>
                    )}
                    <Image
                      floated="left"
                      size="mini"
                      src={
                        language === "en"
                          ? require("../images/fr_flag.png")
                          : require("../images/us_flag.png")
                      }
                    />
                    {mainEtymology.title}
                  </Card.Header>
                  {language === "en" ? (
                    <Card.Description>{mainDescription}</Card.Description>
                  ) : null}
                </Card.Content>
              </Card>
              <Card>
                <Image src={secondaryEtymology.imageUrl} />
                <Card.Content>
                  <Card.Header className="lsf-app-card-header">
                    {!secondaryEtymology.video_url ? null : (
                      <Icon size="large" name="film" />
                    )}
                    <Image
                      floated="left"
                      size="mini"
                      src={
                        language === "en"
                          ? require("../images/us_flag.png")
                          : require("../images/fr_flag.png")
                      }
                    />
                    {secondaryEtymology.title}
                  </Card.Header>
                  {language === "fr" ? (
                    <Card.Description>{mainDescription}</Card.Description>
                  ) : null}
                </Card.Content>
              </Card>
            </Card.Group>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const EtymologyList = (props: Object) => {
  const { etymology, language } = props;
  return (
    <Segment className="lsf-etymology-list-container">
      <List className="lsf-etymology-list" divided verticalAlign="middle">
        {etymology.map((etymo, index) => (
          <List.Item key={index} className="lsf-etymology-list-item">
            <EtymologyDisplay
              index={index}
              etymology={etymo}
              language={language}
            />
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default EtymologyList;

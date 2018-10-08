/* @flow */
import React, { Component } from "react";

// semantic ui react
import { Segment, Card, Modal, List, Image, Flag } from "semantic-ui-react";

class EtymologyDisplay extends Component {
  state = { active: false };

  constructor(props: Object) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const { engEtymology, frEtymology } = this.props.etymology;
    const { language } = this.props;
    const { active } = this.state;
    const mainEtymology = language === "en" ? engEtymology : frEtymology;
    const secondaryEtymology = language === "en" ? frEtymology : engEtymology;
    const mainDescription =
      language === "en"
        ? engEtymology.descriptionEn
        : engEtymology.descriptionFr;
    const mainFlag = (language === "en") ? "us" : "fr";
    const secondaryFlag = (language === "en") ? "fr" : "us";
    return (
      <div className="lsf-etymology-term" onClick={this.handleClick}>
        <h3 className="lsf-etymology-term-title">
          {mainEtymology.title + " / " + secondaryEtymology.title}
        </h3>
        <Modal
          className="lsf-etymology-term-modal"
          open={active}
          closeIcon="close"
          onClose={this.handleClick}
          closeOnDimmerClick
        >
          <Modal.Content className="lsf-etymology-display">
            <Card.Group centered>
              <Card>
                <Image src={mainEtymology.imageUrl} />
                <Card.Content>
                  <Card.Header className="etymology-term-display-header">
                    <Flag name={mainFlag} />
                    {mainEtymology.title}
                  </Card.Header>
                  {(language === 'en') ? <Card.Description>{mainDescription}</Card.Description> : null}
                </Card.Content>
              </Card>
              <Card>
                <Image src={secondaryEtymology.imageUrl} />
                <Card.Content>
                  <Card.Header className="etymology-term-display-header">
                    <Flag name={secondaryFlag} />
                    {secondaryEtymology.title}
                  </Card.Header>
                  {(language === 'fr') ? <Card.Description>{mainDescription}</Card.Description> : null}
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
          <List.Item className="lsf-etymology-list-item">
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

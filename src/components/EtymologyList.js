/* @flow */
import React, { Component } from 'react';

// semantic ui react
import { Segment, Card, Modal, List, Image } from 'semantic-ui-react';

class EtymologyDisplay extends Component {
  state = { active: false }

  constructor(props: Object) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    const { eng_etymology, fr_etymology } = this.props.etymology;
    const { language } = this.props;
    const { active } = this.state;
    const mainEtymology = (language === 'en') ? eng_etymology : fr_etymology;
    const secondaryEtymology = (language === 'en') ? fr_etymology : eng_etymology;
    return (
      <div className="lsf-etymology-term" onClick={this.handleClick}>
        <h3 className="lsf-etymology-term-title">{mainEtymology.title + ' / ' + secondaryEtymology.title}</h3>
        <Modal
          className="lsf-etymology-term-modal"
          open={active} closeIcon="close"
          onClose={this.handleClick}
          closeOnDimmerClick>
          <Modal.Content className="lsf-etymology-display" image>
            <Image src={mainEtymology.image_url} />
            <Modal.Description>
              <h1>{mainEtymology.title}</h1>
              <p>{mainEtymology.description_en}</p>
            </Modal.Description>
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
        {etymology.map((etymo, index) =>
          <List.Item className="lsf-etymology-list-item"><EtymologyDisplay index={index} etymology={etymo} language={language} /></List.Item>
        )}
      </List>
    </Segment>
  )
}

export default EtymologyList;

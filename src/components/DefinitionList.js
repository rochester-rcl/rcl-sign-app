/* @flow */

// React
import React, {Component} from 'react';

// React Native
import {Container, Modal, Segment, Button, Card} from 'semantic-ui-react';

// Styles
import {DefinitionListStyles, DefinitionDisplayStyles} from '../styles/Styles';

// Components
import DefinitionDisplay from './DefinitionDisplay';

export default class DefinitionList extends Component {
  constructor(props : Object) {
    super(props);
    /*
    (this : any).definitionData = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    */
  }
/*
  listView = (row1, row2) =>{
    row1 !== row2;
    const items = definitions.map((data) =>
      <DefinitionDisplay
        engDefinition={data.eng_definition} frDefinition={data.fr_definition} currentLanguage={currentLanguage}
        toggleModal={toggleModal}/>
    );};
    */

  render() {
    console.log(this.props);
    const {definitions, currentLanguage, fetchingDefinitions, searchResults, toggleModal} = this.props;

    const searchResultMessage = () => {
      if (currentLanguage === 'en')
        return (definitions.length + ' Results');
      return (definitions.length + ' Résultat')
    };

    if (definitions.length > 0 && !fetchingDefinitions) {
      console.log(definitions);
      if (searchResults) {
        return (
          <Card.Group
            centered
            itemsPerRow={4}>
            <span>{searchResultMessage}</span>
            {definitions.map((data, index) =>
              <DefinitionDisplay
                key={index++}
                engDefinition={data.eng_definition}
                frDefinition={data.fr_definition}
                currentLanguage={currentLanguage}
                toggleModal={toggleModal}/>)
            }
          </Card.Group>
        );
      } else {
        return (
          <Card.Group
            centered
            itemsPerRow={4}>
            {definitions.map((data, index) =>
              <DefinitionDisplay
                key={index++}
                engDefinition={data.eng_definition}
                frDefinition={data.fr_definition}
                currentLanguage={currentLanguage}
                toggleModal={toggleModal}/>)
            }

          </Card.Group>
        );
      }
    } else if (definitions.hasOwnProperty('error') && !fetchingDefinitions) {
      return (
        <div >
          <div>
            {definitions.message}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            primary/>
        </div>
      );
    }
  }
}

/* @flow */

// React
import React, {Component} from 'react';

// React Native
import {Container, Modal, Segment, Button, List, Grid} from 'semantic-ui-react';

// Styles
import {DefinitionListStyles, DefinitionDisplayStyles} from '../styles/Styles';

// Components
import DefinitionDisplay from './DefinitionDisplay';

export default class DefinitionList extends Component {
  columns = 3;
  constructor(props : Object) {
    super(props);
    (this: any).sliceDefinitions = this.sliceDefinitions.bind(this);
  }

  sliceDefinitions() {
    const { definitions } = this.props;
    const step = Math.floor(definitions.length / this.columns);
    let chunk = 0;
    const cols = [];
    for (let i = 0; i < this.columns; i++, chunk += step) {
      let col;
      if (i === this.columns-1) {
        col = definitions.slice(chunk, definitions.length);
      } else {
        col = definitions.slice(chunk, chunk+step);
      }
      cols.push(col);
    }
    return cols;
  }

  render() {
    const {definitions, currentLanguage, fetchingDefinitions, searchResults, toggleModal} = this.props;
    let cols;
    if (definitions.length > this.columns) {
      cols = this.sliceDefinitions();
    } else {
      cols = [definitions];
    }
    return(
      <Segment className="lsf-definitions-list-container">
        <Grid className="lsf-definitions-list" columns={cols.length} divided>
            {this.sliceDefinitions().map((col, index) => (
              <Grid.Column>
                  <List divided verticalAlign="middle">
                  {col.map((definition, index) =>
                    <List.Item className="lsf-definition-list-item">
                      <DefinitionDisplay
                        key={index++}
                        engDefinition={definition.eng_definition}
                        frDefinition={definition.fr_definition}
                        currentLanguage={currentLanguage}
                        toggleModal={toggleModal}/>
                      </List.Item>
                  )}
                  </List>
                </Grid.Column>
            ))}
        </Grid>
      </Segment>
    )
  }
}

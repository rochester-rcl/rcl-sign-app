/* @flow */

// React
import React, {Component} from 'react';
import * as wood from "../images/wood.jpg";

// React Native
import {Container, Modal, Segment, Button, List, Grid} from 'semantic-ui-react';

// Material-ui
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import DefinitionDisplay from './DefinitionDisplay';
import GridItem from '../components/GridItem';
import GridContainer from '../components/GridContainer';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

export default class DefinitionList extends Component {

  state = { active: false };

  constructor(props : Object) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
    (this: any).sliceDefinitions = this.sliceDefinitions.bind(this);
  }

  /*
  columns = 3;
  constructor(props : Object) {
    super(props);
    (this: any).sliceDefinitions = this.sliceDefinitions.bind(this);
  }
  */

  handleClick() {
    this.setState({
      active: !this.state.active
    });
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
    const { classes } = this.props;
    const { etymology, language } = this.props;

    /*
    const {definitions, currentLanguage, fetchingDefinitions, searchResults, toggleModal} = this.props;
    let cols;
    if (definitions.length > this.columns) {
      cols = this.sliceDefinitions();
    } else {
      cols = [definitions];
    }
    */
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {etymology.map((etymo, index) =>
            <DefinitionDisplay
              key={index}
              etymology={etymo}
              language={language}
              />)}
        </GridItem>

        {/*
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
          */}
      </GridContainer>

    );
  }
}

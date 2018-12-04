/* @flow */

// React
import React, {Component} from 'react';
import * as wood from "../images/wood.jpg";

// React Native
import {
  Container,
  Modal,
  Segment,
  Button,
  Card,
  Image,
  Header} from 'semantic-ui-react';

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
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const { classes } = this.props;
    const { etymology, language } = this.props;
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
      </GridContainer>

    );
  }
}

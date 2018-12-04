/* @flow */

// React
import React, { Component } from 'react';

// Semantic-ui-react

import {
  Button,
  Icon,
  Flag
} from 'semantic-ui-react';

// Material-ui
import withStyles from "@material-ui/core/styles/withStyles";

// Components;
import Table from '../components/Table';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import CardBody from '../components/CardBody';
import GridItem from '../components/GridItem';
import GridContainer from '../components/GridContainer';
import Snackbar from '../components/Snackbar';
import SnackbarContent from '../components/SnackbarContent';

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


class DefinitionDisplay extends Component {
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

  render(){
    /*
    const selectVideos = () => {
      toggleModal({en: engDefinition, fr: frDefinition}, true);
    }*/
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
    const { etymology } = this.props;
    const {classes} = this.props;
      return(
        <SnackbarContent message={mainEtymology.title + " / " + secondaryEtymology.title} />
      );
  }
}

export default withStyles(styles)(DefinitionDisplay);

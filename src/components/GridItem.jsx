import React, {Component} from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    padding: "0 15px !important"
  }
};

class GridItem extends Component{
  render(){
    const { classes, children, ...rest } = this.props;
    return (
      <Grid item {...rest} className={classes.grid}>
        {children}
      </Grid>
    );
  }
}

export default withStyles(style)(GridItem);

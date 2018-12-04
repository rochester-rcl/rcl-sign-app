import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// Components

import DictionaryNavigation from "./DictionaryNavigation";

import sidebarStyle from "../assets/jss/components/sidebarStyle";

class Sidebar extends Component {

  /*
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <prop.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="https://www.creative-tim.com" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  */

  render() {
    const {classes, color, image} = this.props;
    return (<div>
      <Hidden mdUp="mdUp" implementation="css">
        <Drawer variant="temporary" anchor="right" open={this.props.open} classes={{
            paper: classes.drawerPaper
          }} onClose={this.props.handleDrawerToggle} ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}>
          {/* brand */}
          <div className={classes.sidebarWrapper}>
            {/*<HeaderLinks/>*/} {/* links */}
          </div>
          {
            image !== undefined
              ? (<div className={classes.background} style={{
                  backgroundImage: "url(" + image + ")"
                }}/>)
              : null
          }
        </Drawer>
      </Hidden>
      <Hidden smDown="smDown" implementation="css">
        <Drawer anchor="left" variant="permanent" open="open" classes={{
            paper: classes.drawerPaper
          }}>
          {/* brand */}
          <div className={classes.sidebarWrapper}>
            {/*links*/}
            <DictionaryNavigation
              
              language={this.props.language}
              placeholder={(this.props.letter !== undefined) ? this.props.letter : 'A'}
              onSelectLetter={this.props.handleSelectLetter}
              onSearch={this.props.handleSearch}
            />
          </div>
          {
            image !== undefined
              ? (<div className={classes.background} style={{
                  backgroundImage: "url(" + image + ")"
                }}/>)
              : null
          }
        </Drawer>
      </Hidden>
    </div>);
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);

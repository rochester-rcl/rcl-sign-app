/* @flow */
import React, { Component } from "react";

// semantic ui react
import { Menu, Image } from "semantic-ui-react";

// images
import * as usFlag from "../images/us_flag.png";
import * as frFlag from "../images/fr_flag.png";

// history
import history from "../utils/history";

export default class Navigation extends Component {
  state = { activeItem: null };
  constructor(props: Object) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
    (this: any).handleSelectLanguage = this.handleSelectLanguage.bind(this);
  }

  handleClick(event: SyntheticEvent, { name }: string): void {
    this.setState({
      activeItem: name
    }, () => {
      history.push('/' + name.toLowerCase() + '/');
    });
  }

  handleSelectLanguage(language: string): void {
    this.props.handleSelectLanguage(language);
  }

  // TODO pass active down through props
  render() {
    const { items, language } = this.props;
    const { activeItem } = this.state;
    if (items !== null) {
      return (
        <Menu borderless className="lsf-nav-menu">
          {items.map(item => (
            <Menu.Item
              name={item.path}
              active={activeItem === item.path}
              onClick={this.handleClick}
            >
              {item.title}
            </Menu.Item>
          ))}
          <Menu.Item position="right">
            <Menu className="language-menu">
              <Menu.Item
                name="en"
                active={language === "en"}
                onClick={() => this.props.handleSelectLanguage("en")}
              >
                <Image src={usFlag} size="mini" />
              </Menu.Item>
              <Menu.Item
                name="fr"
                active={language === "fr"}
                onClick={() => this.props.handleSelectLanguage("fr")}
              >
                <Image src={frFlag} size="mini" />
              </Menu.Item>
            </Menu>
          </Menu.Item>
        </Menu>
      );
    } else {
      return null;
    }
  }
}

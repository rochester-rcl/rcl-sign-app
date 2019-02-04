/* @flow */
import React, { Component } from "react";

// semantic ui react
import { Menu, Image } from "semantic-ui-react";

// images
import usFlag from "../images/us_flag.png";
import frFlag from "../images/fr_flag.png";
import logo from "../images/lsf-logo.svg";

// history
import history, { basename } from "../utils/history";

// constants
import { BASENAME } from "../utils/Constants";

export default class Navigation extends Component {
  state = { activeItem: null };
  constructor(props: Object) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
    (this: any).handleSelectLanguage = this.handleSelectLanguage.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    this.setState({
      activeItem: basename(location),
    });
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    const { language, location } = this.props;
    if (location !== prevProps.location) {
      this.setState({
        activeItem: basename(location),
      });
    }
  }

  handleClick(event: SyntheticEvent, { name }: string): void {
    this.setState(
      {
        activeItem: name
      },
      () => {
        // history.push(`/${BASENAME}/${name.toLowerCase()}/`);
        history.push("/" + name.toLowerCase() + "/");
      }
    );
  }

  handleSelectLanguage(language: string): void {
    this.props.handleSelectLanguage(language);
  }

  // TODO pass active down through props
  render() {
    const { items, language } = this.props;
    const _items = [...items];
    const { activeItem } = this.state;
    const introIndex = items.findIndex(item => item.path === "intro");
    let intro;
    if (introIndex > -1) {
      intro = { ..._items[introIndex] };
      _items.splice(introIndex, 1);
    }
    if (items !== null) {
      return (
        <Menu stackable borderless className="lsf-nav-menu">
          {intro !== undefined ? (
            <Menu.Item
              key="intro"
              name={intro.path}
              active={activeItem === basename(intro.path)}
              onClick={this.handleClick}
            >
              <Image src={logo} size="tiny" />
            </Menu.Item>
          ) : null}
          {_items.map((item, index) => (
            <Menu.Item
              key={index++}
              name={item.path}
              active={activeItem === basename(item.path)}
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

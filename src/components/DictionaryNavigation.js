/* @flow */

// React
import React, {Component} from 'react';

// Semantic ui react
import {
  Container,
  Button,
  Modal,
  Menu,
  Search,
  Dropdown,
  Segment,
  Icon,
  Sidebar
} from 'semantic-ui-react';

// Material
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import withStyles from "@material-ui/core/styles/withStyles";

// Constants
import {Alphabet, AlphabetMap} from '../utils/Constants';

import sidebarStyle from "../assets/jss/components/sidebarStyle";

const formattedAlphabet = Alphabet.map((letter) => {
  return {key: letter, value: letter, text: letter.toUpperCase()}
});

//const Item = Picker.Item;

class DictionaryNavigation extends Component {
  state: Object = {
    currentLetter: 'a',
    displayModal: false,
    currentRange: 'a-g',
    currentIndex: 0,
    searchFocused: false,
    search: '',
    isSearching: false,
    currency: 'EUR'
  };
  letterRange: Array<string> = ['a-g', 'h-m', 'n-r', 's-z'];
  constructor(props : Object) {
    super(props);

    (this : any).handleRangeSelect = this.handleRangeSelect.bind(this);
    (this : any).loadNewDefinitions = this.loadNewDefinitions.bind(this);
    (this : any).onSearchChange = this.onSearchChange.bind(this);
    (this : any).submitSearch = this.submitSearch.bind(this);
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
    this.props.onSelectLetter(event.target.value);
  };

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate(prevProps : Object, prevState : Object): void {
    let {currentLetter, currentRange} = this.state;
    if (prevProps.language !== this.props.language)
      this.loadNewDefinitions(currentLetter, currentRange, true);
    if (prevProps.searchResults !== this.props.searchResults) {
      this.setState({isSearching: this.props.searchResults});
    }
  }

  handleLetterChange(selectedLetter : string, {value}) {
    console.log(value);
    const {currentLetter, currentRange} = this.state;
    if (value !== currentLetter || this.props.searchResults) {
      this.setState({
        currentLetter: value
      }, () => this.props.toggleSearchResultsDisplay(false));
      this.loadNewDefinitions(value, currentRange, true);
    }
    //this.handleModalToggle();
  }

  onSearchChange(event : SyntheticEvent): void {
    this.setState({search: event.target.value});
  }

  submitSearch(event : SyntheticEvent): void {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.state.search);
    this.props.onSearch(this.state.search);
  }

  handleRangeSelect(selectedRange : string, index : number) {
    const {currentLetter, currentRange} = this.state;
    this.props.toggleSearchResultsDisplay(false);
    this.handleSearchFocus(false);
    //this.textInput.blur();
    if (selectedRange !== currentRange || this.props.searchResults) {
      this.setState({
        currentRange: selectedRange,
        currentIndex: index
      }, () => this.props.toggleSearchResultsDisplay(false));
      this.loadNewDefinitions(currentLetter, selectedRange, false);
    }
  }

  loadNewDefinitions(currentLetter : string, currentRange : string, clearCache : boolean): void {
    console.log(currentLetter);
    this.props.loadDefinitions({
      language: this.props.language,
      letter: currentLetter,
      range: currentRange
    }, clearCache);
  }

  componentDidUpdate(prevProps : Object, prevState : Object): void {
    let {currentLetter, currentRange} = this.state;
    if (prevProps.language !== this.props.language)
      this.loadNewDefinitions(currentLetter, currentRange, true);
    if (prevProps.searchResults !== this.props.searchResults) {
      this.setState({isSearching: this.props.searchResults});
    }
  }

  render() {
    const {language, placeholder, onSelectLetter} = this.props;
    const {classes, color} = this.props;

    const {
      displayModal,
      currentLetter,
      currentRange,
      currentIndex,
      searchFocused,
      isSearching
    } = this.state;

    const prompt = (language === 'en')
      ? 'Choose a Letter'
      : 'Choisissez une Lettre';
    const searchPrompt = (language === 'en')
      ? 'Search'
      : 'Cherche';

    return (
      <div style={{
        paddingTop: '7rem'
      }}>
      <List className={classes.list}>
        <ListItem
          className={classes.itemLink + classes.whiteFont}>
          <TextField
            className={classes.itemText}
            id="standard-name"
            InputLabelProps={{
              className: classes.whiteFont
            }}
            label="Search term"
            InputProps={{
              className: classes.whiteFont
            }}
            onChange={this.onSearchChange}
            margin="normal">
          </TextField>
          <IconButton
            onClick={this.submitSearch}
            className={classes.itemIcon}>
            <SearchIcon/>
          </IconButton>
        </ListItem>

        <ListItem
          className={classes.itemLink + classes.whiteFont}>
          <TextField
            className={classes.itemText}
            id="filled-select-currency"
            select
            SelectProps={{
              MenuProps:
              {
                className: classes.menu,
              },
            }}
            InputLabelProps={{
              className: classes.whiteFont
            }}
            InputProps={{
              className: classes.whiteFont
            }}
            label="Select Letter"
            value={this.state.currentLetter}
            onChange={this.handleChange('currentLetter')}
            helperText="Please select a letter"
            margin="normal">
            {
              AlphabetMap.map(option =>
                (<MenuItem
                  key={option.value}
                  value={option.value}
                  onChange={onSelectLetter}>
                {option.label}
              </MenuItem>))
            }
          </TextField>
        </ListItem>
      </List>
    </div>);
  }
}

export default withStyles(sidebarStyle)(DictionaryNavigation);

/* @flow */

// React Native
import { StyleSheet } from 'react-native';

const GlobalStyles: Object = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export const BannerStyles: Object = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    flex: 0.05,
    alignSelf: 'stretch',
    backgroundColor: '#4286f4',
    paddingTop: 10,
    paddingBottom: 5,
    justifyContent: 'center',
    borderBottomColor: '#3778e6',
    borderBottomWidth: 3,
  },
  bannerImage: {
    width: 50,
    height: 25,
    opacity: 0.5,
    paddingRight: 10,
  },
  bannerImageHome: {
    width: 75,
    height: 32,
    opacity: 1.0,
  },
  selectedLanguage: {
    width: 50,
    height: 25,
    opacity: 1.0,
  },
  bannerText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 10,
  }
});

export const ModalStyles: Object = StyleSheet.create({
  letterPickerModal: {
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export const PickerStyles: Object = StyleSheet.create({
  languagePicker: {
    flex: 1,
  }
});

export const NavigationStyles: Object = StyleSheet.create({
  letterPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.6,
    backgroundColor: '#ddd',
  },
  navContainer: {
    flex: 0.25,
    alignSelf: 'stretch',
    borderBottomColor: '#828282',
    borderBottomWidth: 3,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 2,
    textAlign: 'center',
    flex: 0.20,
    margin: 10,
    fontSize: 10,
  },
  letterRange: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export const ButtonStyles: Object = StyleSheet.create({
  buttonBackground: {
    backgroundColor: '#5ec44e',
    flex: 0.125,
    marginLeft: 20,
    marginRight: 20,
    overflow: 'hidden',
  },
  buttonBackgroundBlurred: {
    backgroundColor: '#fff',
    flex: 0.125,
    marginLeft: 20,
    marginRight: 20,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 2,
  },
  selectedRangeButton: {
    backgroundColor: '#5ec44e',
    margin: 5,
    flex: 1,
  },
  letterRangeButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 2,
    margin: 5,
    flex: 1,
  },
  selectedRangeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonText: {
    color: '#282828',
    textAlign: 'center',
  }
});

export const DefinitionListStyles: Object = StyleSheet.create({
  definitionListContainer: {
    alignSelf: 'stretch',
    flex: 0.75,
    backgroundColor: "#fff",
  }
});

export const DefinitionDisplayStyles: Object = StyleSheet.create({
  definition: {
    color: "#000",
    padding: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    fontFamily: 'Helvetica-Light, sans-serif-light',
  },
  errorMessage: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  }
});

export default GlobalStyles;

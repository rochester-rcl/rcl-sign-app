/* @flow */

// React Native
import { StyleSheet } from 'react-native';

const GlobalStyles: Object = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4e59d4',
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
    height: 100,
    flex: 0.125,
    marginTop: 20,
  },
  bannerImageContainer: {

  },
  bannerImage: {
    width: 100,
    height: 50
  },
  selectedLanguage: {
    width: 100,
    height: 50,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  bannerText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 10,
  }
});

export const ModalStyles: Object = StyleSheet.create({
  letterPickerModal: {
    justifyContent: 'center',
  }
});

export const PickerStyles: Object = StyleSheet.create({
  languagePicker: {
    flex: 1,
  }
});

export const NavigationStyles: Object = StyleSheet.create({
  navContainer: {
    backgroundColor: "#3b3738",
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.0675,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderColor: '#5ec44e',
    borderRadius: 2,
    borderWidth: 3,
    textAlign: 'center',
    flex: 1,
    margin: 10,
    fontSize: 10,
  }
});

export const ButtonStyles: Object = StyleSheet.create({
  buttonBackground: {
    backgroundColor: '#5ec44e',
    flex: 0.25,
    margin: 10,
    borderWidth: 1,
    borderRadius: 2,
    overflow: 'hidden',
    borderColor: "#3b3738",
    padding: 2,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export const DefinitionListStyles: Object = StyleSheet.create({
  definitionListContainer: {
    margin: 20,
    alignSelf: 'stretch',
    flex: 0.75,
    backgroundColor: "#000",
  }
})

export default GlobalStyles;

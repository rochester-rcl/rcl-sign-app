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
    flex: 0.10,
    alignSelf: 'stretch',
    backgroundColor: '#6ea5fa',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  videoModalPortrait: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#000',
  },
  videoModalLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000',
  }
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
    flex: 0.3,
    backgroundColor: '#ddd',
  },
  navContainer: {
    flex: 0.3,
    alignSelf: 'stretch',
    elevation: 10,
    shadowColor: '#ccc',
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#fff',
    textAlign: 'center',
    flex: 0.2,
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
    flex: 1,
    marginHorizontal: 40,
    overflow: 'hidden',
    borderRadius: 2,
  },
  buttonBackgroundBlurred: {
    backgroundColor: '#fff',
    flex: 0.125,
    marginLeft: 20,
    marginRight: 20,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 2,
  },
  selectedRangeButton: {
    backgroundColor: '#5ec44e',
    margin: 5,
    flex: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5ec44e',
    padding: 5,
  },
  letterRangeButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 2,
    margin: 5,
    flex: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  selectedRangeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonText: {
    color: '#484848',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'column',
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 30,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButtonTextInverted: {
    color: '#484848',
    alignSelf: 'center',
    marginTop: 30,
    borderColor: '#484848',
    borderWidth: 2,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
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
    color: "#484848",
    margin: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  errorMessage: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  }
});

export const VideoStyles: Object = StyleSheet.create({
  videoPlayer: {
    flex: 1,
    backgroundColor: '#000',
  },
  touchableVideo: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoTitleContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  videoTitle: {
    color: '#fff',
    elevation: 5,
    fontSize: 20,
    padding: 10,
  },
  videoImage: {
    width: 50,
    height: 25,
    opacity: 0.8,
    paddingRight: 10,
    alignSelf: 'center',
  }
})

export default GlobalStyles;

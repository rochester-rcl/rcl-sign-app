/* @flow */

// React Native
import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#6ea5fa',
    fontFamily: 'RobotoCondensed-Regular',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'RobotoCondensed-Regular',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'RobotoCondensed-Regular',
  },
});

export const BannerStyles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    flex: 0.175,
    alignSelf: 'stretch',
    backgroundColor: '#6ea5fa',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bannerImage: {
    width: 50,
    height: 25,
    opacity: 0.5,
    paddingRight: 10,
  },
  onlineStatusImage: {
    width: 50,
    height: 25,
    opacity: 1,
    margin: 'auto',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 20, // needs to be the same as paddingBottom on bannerContainer
    right: 0,
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
    fontFamily: 'RobotoCondensed-Regular',
  },
});

export const ModalStyles = StyleSheet.create({
  letterPickerModal: {
    justifyContent: 'center',
    fontFamily: 'RobotoCondensed-Regular',
  },
  videoModalPortrait: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#000',
  },
  videoModalLandscape: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#000',
  },
});

export const PickerStyles = StyleSheet.create({
  languagePicker: {
    flex: 1,
    fontFamily: 'RobotoCondensed-Regular',
  },
});

export const NavigationStyles = StyleSheet.create({
  letterPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'center',
    maxWidth: 150,
    
    flex: 0.3,
    backgroundColor: '#ddd',
    fontFamily: 'RobotoCondensed-Regular',
  },
  navContainer: {
    flex: 0.3,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  navContainerLandscape: {
    flex: 0.8,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    flexDirection: 'column',
    shadowColor: '#000',
    paddingHorizontal: 40,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  searchBar: {
    backgroundColor: '#fff',
    flex: 0.3,
    fontSize: 15,
    marginHorizontal: 15,
    fontFamily: 'RobotoCondensed-Regular',
  },
  searchBarFocused: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
  },
  letterRange: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'RobotoCondensed-Regular',
    marginHorizontal: 15,
  },
  hideNav: {
    display: 'none',
  },
});

export const ButtonStyles = StyleSheet.create({
  buttonBackground: {
    backgroundColor: '#5ec44e',
    flex: 0.6,
    marginVertical: 5,
    marginHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 2,
    justifyContent: 'center',
  },
  buttonBackgroundBlurred: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 40,
    overflow: 'hidden',
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
    fontFamily: 'RobotoCondensed-Regular',
  },
  buttonText: {
    color: '#484848',
    textAlign: 'center',
    fontFamily: 'RobotoCondensed-Regular',
  },
  backButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introBackButton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    alignSelf: 'center',
    borderColor: '#ccc',
    borderWidth: 2,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontFamily: 'RobotoCondensed-Regular',
  },
  introBackButtonText: {
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 5,
    fontFamily: 'RobotoCondensed-Regular',
  },
  backButtonTextInverted: {
    color: '#484848',
    alignSelf: 'center',
    margin: 20,
    borderColor: '#484848',
    borderWidth: 2,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontFamily: 'RobotoCondensed-Regular',
  },
  buttonMenuContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    flex: 0.4,
  },
  buttonMenuContainerCol: {
    flexDirection: 'column',
    margin: 20,
    flex: 0.4,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  sentenceButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentenceButton: {
    width: 50,
    height: 50
  },
  downloadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButton: {
    width: 50,
    height: 50,
  },
  downloadButtonActivity: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export const DefinitionListStyles = StyleSheet.create({
  definitionListContainer: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  definitionListContainerLandscape: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  containerLandscape: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#6ea5fa',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  containerPortrait: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#6ea5fa',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

export const DefinitionDisplayStyles = StyleSheet.create({
  definitionTouchableOpacity: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  definition: {
    color: '#484848',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 15,
  },
  errorMessage: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 15,
  },
  searchResultsText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 15,
    marginBottom: 5,
  },
});
const VIDEO_ASPECT = 1.77;
export const VideoStyles = StyleSheet.create({
  touchableVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  videoPlayerContainerPortrait: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  videoPlayerContainerLandscape: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  videoPlayerPortrait: {
    flex: 1,
    opacity: 1.0,
  },
  videoPlayerLandscape: {
    flex: 0.5,
    aspectRatio: VIDEO_ASPECT,
    width: 'auto',
  },
  videoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
  },
  videoImage: {
    width: 50,
    height: 25,
    opacity: 0.8,
    marginRight: 15,
    alignSelf: 'center',
  },
  captionsContainer: {
    backgroundColor: '#000',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 0,
    opacity: 0.8,
    padding: 5
  },
  captions: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center'
  }
});

export const IntroStyles = StyleSheet.create({
  introView: {
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  headerView: {
    flex: 0.3,
    backgroundColor: '#6ea5fa',
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    margin: 15,
    fontFamily: 'RobotoCondensed-Regular',
  },
  instructionsContainer: {
    justifyContent: 'center',
    flex: 0.3,
  },
  instructions: {
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'RobotoCondensed-Regular',
  },
  contactView: {
    alignItems: 'center',
    flex: 0.4,
  },
  contactText: {
    textAlign: 'justify',
    alignSelf: 'center',
    marginLeft: 40,
    marginRight: 40,
    fontFamily: 'RobotoCondensed-Regular',
  },
  contactLink: {
    color: '#6ea5fa',
    fontSize: 16,
    padding: 10,
    fontFamily: 'RobotoCondensed-Regular',
  },
});

export default GlobalStyles;

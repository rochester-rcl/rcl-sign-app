/* @flow */

// React Native
import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    flex: 0.2,
    alignSelf: 'stretch',
    backgroundColor: '#6ea5fa',
    paddingBottom: 20,
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
    alignItems: 'center',
    flex: 0.3,
    backgroundColor: '#ddd',
    fontFamily: 'RobotoCondensed-Regular',
  },
  navContainer: {
    flex: 0.3,
    alignSelf: 'stretch',
    elevation: 10,
    backgroundColor: '#fff',
    shadowColor: '#ccc',
  },
  navContainerLandscape: {
    flex: 0.5,
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
    fontFamily: 'RobotoCondensed-Regular',
  },
  searchBarFocused: {
    backgroundColor: '#fff',
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
    fontFamily: 'RobotoCondensed-Regular',
  },
  letterRange: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowRadius: 1,
    shadowOpacity: 0.4,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 2},
    fontFamily: 'RobotoCondensed-Regular',
  },
  hideNav: {
    display: 'none',
  },
});

export const ButtonStyles = StyleSheet.create({
  buttonBackground: {
    backgroundColor: '#5ec44e',
    flex: 1,
    marginHorizontal: 40,
    overflow: 'hidden',
    borderRadius: 2,
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
    flex: 0.35,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
    marginTop: 10
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
    flex: 0.4
  },
  buttonMenuContainerCol: {
    flexDirection: 'column',
    margin: 20,
    flex: 0.4,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
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
    elevation: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const DefinitionDisplayStyles = StyleSheet.create({
  definition: {
    color: '#484848',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 15,
  },
  definitionIOS: {
    color: '#484848',
    margin: 10,
    textDecorationLine: 'underline',
    textDecorationColor: '#ddd',
    fontFamily: 'RobotoCondensed-Regular',
  },
  errorMessage: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 15
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
    elevation: 5,
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
    justifyContent: 'flex-end'
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
    fontFamily: 'RobotoCondensed-Regular',
  },
  contactView: {
    alignItems: 'center',
    flex: 0.4,
  },
  contactText: {
    textAlign: 'justify',
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
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

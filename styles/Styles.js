/* @flow */

// React Native
import {StyleSheet} from 'react-native';

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
    flex: 0.1,
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
  onlineStatusImage: {
    width: 50,
    height: 25,
    opacity: 1,
    paddingRight: 20,
    position: 'absolute',
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
  },
});

export const ModalStyles: Object = StyleSheet.create({
  letterPickerModal: {
    justifyContent: 'center',
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

export const PickerStyles: Object = StyleSheet.create({
  languagePicker: {
    flex: 1,
  },
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
  },
  searchBarFocused: {
    backgroundColor: '#fff',
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
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
  },
  hideNav: {
    display: 'none',
  },
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
  },
  buttonText: {
    color: '#484848',
    textAlign: 'center',
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
    fontWeight: 'bold',
  },
  introBackButtonText: {
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    borderColor: '#fff',
    borderWidth: 2,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 5,
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
    fontWeight: 'bold',
  },
  buttonMenuContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  buttonMenuContainerCol: {
    flexDirection: 'column',
    margin: 20,
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

export const DefinitionListStyles: Object = StyleSheet.create({
  definitionListContainer: {
    alignSelf: 'stretch',
    flex: 0.75,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center'
  },
});

export const DefinitionDisplayStyles: Object = StyleSheet.create({
  definition: {
    color: '#484848',
    margin: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  definitionIOS: {
    color: '#484848',
    margin: 10,
    textDecorationLine: 'underline',
    textDecorationColor: '#ddd',
  },
  errorMessage: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  },
});
const VIDEO_ASPECT = 1.77;
export const VideoStyles: Object = StyleSheet.create({
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
  },
  videoImage: {
    width: 50,
    height: 25,
    opacity: 0.8,
    marginRight: 15,
    alignSelf: 'center',
  },
});

export const IntroStyles: Object = StyleSheet.create({
  introView: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  headerView: {
    flex: 1,
    backgroundColor: '#6ea5fa',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    flex: 1,
  },
  instructions: {
    marginTop: 20,
    flex: 1,
  },
  contactView: {
    marginBottom: 20,
    alignItems: 'center',
    flex: 1,
  },
  contactText: {
    textAlign: 'center',
    padding: 10,
  },
  contactLink: {
    color: '#6ea5fa',
    fontSize: 16,
    padding: 10,
  },
});

export default GlobalStyles;

import React, {Component, createContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {
  downloadFile,
  DOWNLOAD_FILE,
  FILE_DOWNLOAD_PENDING,
  FILE_DOWNLOADED,
} from '../actions/DownloadActions';
import {ButtonStyles} from '../styles/Styles';

export const OfflineDownloadContext = createContext();

const DownloadButton = props => {
  const {status, onPress} = props;
  const sources = {
    DOWNLOAD_FILE: require('../images/cloud-download.png'),
    FILE_DOWNLOAD_PENDING: require('../images/cloud-download-activity.png'),
    FILE_DOWNLOADED: require('../images/cloud-download-saved.png'),
  };
  const source = status ? sources[status] : sources.DOWNLOAD_FILE;
  return (
    <TouchableOpacity
      style={ButtonStyles.downloadButtonContainer}
      onPress={onPress}>
      <Image style={ButtonStyles.downloadButton} source={source} />
    </TouchableOpacity>
  );
};

export const OfflineStatus = props => {
  const {offline, style} = props;
  const source = offline
    ? require('../images/offline.png')
    : require('../images/online.png');
  return <Image resizeMode={'contain'} source={source} style={style} />;
};

export default class OfflineDownload extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    const {onDownloadRequested} = this.props;
    onDownloadRequested();
  }
  render() {
    const {status} = this.props;
    return (
      <View>
        <DownloadButton status={status} onPress={this.handlePress} />
      </View>
    );
  }
}

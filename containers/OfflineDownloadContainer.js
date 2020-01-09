/* @flow */

// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Actions
import * as DownloadActions from '../actions/Actions';

// Styles
import GlobalStyles from '../styles/Styles';

import {Image} from 'react-native';

class OfflineDownloadContainer extends Component {
  componentDidMount() {
    this.props.listenForOnlineStatus();
  }
  render() {
    const {offline} = this.props;
    const source = offline
      ? require('../images/offline.png')
      : require('../images/online.png');
    return (
      <Image
        resizeMode={'contain'}
        source={source}
        style={GlobalStyles.bannerImage}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    offline: state.offlineModeState.offline,
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(DownloadActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps,
)(OfflineDownloadContainer);

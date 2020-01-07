/**
 * LSF - ASL React Native App
 * @flow
 */

// React
import React, { Component } from 'react';

// React Native
import { AppRegistry } from 'react-native';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { configureStore, sagaMiddleWare } from './store/ConfigureStore';
import { Provider } from 'react-redux';

// Sagas
import rootSaga from './middleware/Saga.js';

// Styles
import GlobalStyles from './styles/Styles';

// Containers
import AppRoot from './containers/AppRoot';

const store = configureStore();

sagaMiddleWare.run(rootSaga);

export default class LSFApp extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppRoot/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('lsfapp', () => LSFApp);

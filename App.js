import { applyMiddleware, createStore } from 'redux';

import AppReducer from './src/reducers';
import { AppRegistry } from 'react-native';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { Provider } from 'react-redux';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { middleware } from './src/utils/redux';

const store = createStore(
  AppReducer,
  applyMiddleware(middleware),
);

class ReduxExampleApp extends React.Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }
  
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReduxExample', () => ReduxExampleApp);

export default ReduxExampleApp;

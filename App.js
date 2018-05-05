import { applyMiddleware, createStore } from 'redux';

import AppReducer from './src/reducers';
import { AppRegistry } from 'react-native';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { Provider } from 'react-redux';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { compose } from 'redux';
import { middleware } from './src/utils/redux';
import thunk from 'redux-thunk';

const store = createStore(AppReducer, compose(applyMiddleware(middleware, thunk)))

class HotelApp extends React.Component {
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

AppRegistry.registerComponent('Hotel', () => HotelApp);

export default HotelApp;

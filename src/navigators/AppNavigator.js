import { StackNavigator, addNavigationHelpers } from 'react-navigation';

import ItemPage from '../components/ItemPage';
import LoginPage from '../components/LoginPage';
import MainPage from '../components/MainPage';
import PropTypes from 'prop-types';
import QRReadPage from '../components/QRReadPage';
import React from 'react';
import SearchPage from '../components/SearchPage';
import { addListener } from '../utils/redux';
import { connect } from 'react-redux';

export const AppNavigator = StackNavigator({
  Main: { screen: MainPage },
  Login: { screen: LoginPage },
  Search: { screen: SearchPage },
  QR: { screen: QRReadPage },
  Item: { screen: ItemPage }
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  //me: LoginSelectors.me(state),
});

export default connect(mapStateToProps)(AppWithNavigationState);

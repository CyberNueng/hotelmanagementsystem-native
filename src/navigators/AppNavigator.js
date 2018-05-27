import { StackNavigator, addNavigationHelpers } from 'react-navigation';

import CategoryPage from '../components/CategoryPage';
import HistoryPage from '../components/HistoryPage'
import InfoPage from '../components/InfoPage';
import ItemPage from '../components/ItemPage';
import LoginPage from '../components/LoginPage';
import MainPage from '../components/MainPage';
import OnlyYouPage from '../components/OnlyYouPage';
import PropTypes from 'prop-types';
import QRReadPage from '../components/QRReadPage';
import React from 'react';
import SearchPage from '../components/SearchPage';
import { addListener } from '../utils/redux';
import { connect } from 'react-redux';

export const AppNavigator = StackNavigator({
  Home: { screen: MainPage },
  Login: { screen: LoginPage },
  Search: { screen: SearchPage },
  QR: { screen: QRReadPage },
  Item: { screen: ItemPage },
  History: { screen: HistoryPage },
  Info: { screen: InfoPage },
  Category: { screen: CategoryPage },
  OnlyYou: { screen: OnlyYouPage },
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
});

export default connect(mapStateToProps)(AppWithNavigationState);

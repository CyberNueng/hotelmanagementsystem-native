import MainPage from '../components/MainPage';
import PropTypes from 'prop-types';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { addListener } from '../utils/redux';
import { connect } from 'react-redux';

export const AppNavigator = StackNavigator({
  Main: { screen: MainPage },
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
        navigation={{
          dispatch,
          state: nav,
          addListener,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

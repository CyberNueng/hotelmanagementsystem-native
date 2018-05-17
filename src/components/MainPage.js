import { StyleSheet, Text, View } from 'react-native';

import CommonActions from '../common/actions';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import MainCarousel from '../layouts/MainCarousel'
import React from 'react';
import { SearchBar } from 'antd-mobile';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  authen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    height: '10%'
  },
});

class MainPage extends React.Component {
  componentWillMount() {
    // fetch user info then set serverSide to false
    const { setLoading, getMe, navigation, me } = this.props;
    setLoading(true)
    getMe().then(
      () => {
        setLoading(false)
      },
      () => {
        setLoading(false)
        navigation.navigate('Login', {})
      }
    )
  }

  render() {
    const { me, navigation } = this.props;
    if (!me) {
      return (
        <View style={styles.authen}>
          <Text>Check Authorized...</Text>
        </View>
      )
    } 
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search"
          maxLength={30}
          onFocus={() => navigation.navigate('Search', {})}
          cancelText='go'
        />
        <MainCarousel />
      </View>
    )
  }
}

MainPage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  me: LoginSelectors.me(state),
  loginStatus: LoginSelectors.loginStatus(state)
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  login: ({ username, password }) => dispatch(LoginActions.login({ username, password })),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(MainPage);
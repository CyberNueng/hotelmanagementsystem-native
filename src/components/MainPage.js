import { StyleSheet, Text, View } from 'react-native';

import CommonActions from '../common/actions';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import { NavigationActions } from 'react-navigation';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class MainPage extends React.Component {
  /*state = {
    serverSideRendering: true
  }*/

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
      }
    )
    if (!me) {
      navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{'user: ' + this.props.me}</Text>
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
import { Input, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';

import { Button } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import { NavigationActions } from 'react-navigation';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logintext: {
    color: '#000'
  }
});

class LoginPage extends React.Component {
  onSubmit = () => {
    const username = "room"
    const password = "1234"
    this.props.login({ username, password })
  }

  render() {
    const { loginStatus, navigation } = this.props;
    if(loginStatus){
      navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }))
    }
    return (
      <View style={styles.container}>
        <Text h1 style={styles.logintext}>Login</Text>
        <Button inline size="small" onClick={this.onSubmit}>Login</Button>
      </View>
    )
  }
}

LoginPage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  loginStatus: LoginSelectors.loginStatus(state)
});

const mapDispatchToProps = dispatch => ({
  login: ({ username, password }) => dispatch(LoginActions.login({ username, password }))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(LoginPage);
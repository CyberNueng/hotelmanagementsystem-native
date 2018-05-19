import { ActivityIndicator, BackHandler, Dimensions, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import CommonActions from '../common/actions';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import React from 'react';
import TabMenu from '../layouts/TabMenu';
import { compose } from 'redux';
import { connect } from 'react-redux';

var {height, width} = Dimensions.get('window');
height = height-24 //-24 on Android Statusbar
const styles = StyleSheet.create({
  authen: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: height,
    width: width,
    backgroundColor: '#EEE',
  },
  tabBar:{
    width: width,
    height: 50,
  },
});

class MainPage extends React.Component {
  componentWillMount() {
    // fetch user info then set serverSide to false
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
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

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }

  setBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
    return true;
  }

  render() {
    const { me } = this.props;
    if (!me) {
      return (
        <View style={styles.authen}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Check Authorized...</Text>
        </View>
      )
    } 
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <View style={styles.tabBar}> 
          <TabMenu navigate={navigation.navigate} page='Home'/>
        </View>
      </KeyboardAvoidingView>
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
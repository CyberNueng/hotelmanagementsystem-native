import { ActivityIndicator, BackHandler, Dimensions, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import CommonActions from '../common/actions';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import React from 'react';
import { SearchBar } from 'react-native-elements'
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
  search: {
    height: '10%'
  },
});

class SearchPage extends React.Component {
  componentWillMount() {
    // fetch user info then set serverSide to false
    const { setLoading, getMe, navigation, me } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
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

  componentDidMount() {
    this.search.focus();
  }

  componentWillUnmount() {
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
        <SearchBar
          platform="android"
          placeholder="Search"
          containerStyle={{height: 50, justifyContent: 'center'}}
          inputContainerStyle={{paddingTop: 5}}
          autoFocus
          ref={search => this.search = search}
        />
      </KeyboardAvoidingView>
    )
  }
}

SearchPage.navigationOptions = {
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(SearchPage);
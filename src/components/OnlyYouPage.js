import { ActivityIndicator, BackHandler, Dimensions, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Col, Row } from 'antd-mobile';
import { Icon, SearchBar, Text } from 'react-native-elements';

import CommonActions from '../common/actions';
import ItemActions from '../modules/item/actions';
import ItemSelectors from '../modules/item/selectors';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import React from 'react';
import TabMenu from '../layouts/TabMenu'
import { bold } from 'ansi-colors';
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
  scroll: {
    height: height-50,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inscrollview: {
    flex: 1,
    flexDirection: 'row',
  }
});

class OnlyYouPage extends React.Component {
  componentWillMount() {
    // fetch user info then set serverSide to false
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
    const { setLoading, getMe, navigation, getOnlyYou } = this.props;
    setLoading(true)
    getMe().then(
      () => {
        const { me } = this.props
        const room = me.username
        setLoading(false)
        Promise.all([getOnlyYou({ room })])
      },
      () => {
        setLoading(false)
        navigation.navigate('Login', {})
      }
    )
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
    const { me, navigation } = this.props;
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
      <View style={styles.scroll}>
        <ScrollView style={styles.inscrollview}>
        {
          guesthistory.map((l, i) => (
            <View>
            </View>
          ))
        }
        </ScrollView>
        </View>
        <View style={styles.tabBar}> 
          <TabMenu navigate={navigation.navigate} page='OnlyYou'/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

OnlyYouPage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  me: LoginSelectors.me(state),
  onlyYou: ItemSelectors.onlyYou(state),
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
  getOnlyYou: ({ room }) => dispatch(ItemActions.getOnlyYou({ room })),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(OnlyYouPage);
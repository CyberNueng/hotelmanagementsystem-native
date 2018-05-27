import { ActivityIndicator, Dimensions, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Col, Row } from 'antd-mobile';
import { Icon, SearchBar, Text } from 'react-native-elements';

import CommonActions from '../common/actions';
import ItemActions from '../modules/item/actions';
import ItemSelectors from '../modules/item/selectors';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import MainCarousel from '../layouts/MainCarousel'
import React from 'react';
import Recommend from '../layouts/Recommend'
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
  iconrow: {
    flex: 1,
    flexDirection: 'row'
  },
  iconitem: {
    width: width/4,
    height: height*0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texticon: {
    fontSize: height*0.02
  },
  scroll: {
    width: width,
    height: height-100, //-100 from tabBar and serachber
  },
  tabBar:{
    width: width,
    height: 50,
  },
  searchbar: {
    height: 50,
    justifyContent: 'center',
    elevation: 3,
  },
});

class MainPage extends React.Component {
  componentWillMount() {
    // fetch user info then set serverSide to false
    Keyboard.dismiss();
    const { setLoading, getMe, navigation, getPopular, getNewItem, getRecommend } = this.props;
    setLoading(true)
    getMe().then(
      () => {
        const { me } = this.props
        const room = me.username
        setLoading(false)
        Promise.all([getPopular({ room }), getNewItem({ room }), getRecommend({ room })])
      },
      () => {
        setLoading(false)
        navigation.navigate('Login', {})
      }
    )
  }

  render() {
    const { me, navigation, popularItem, recommend, newItem } = this.props;
    if (!me) {
      return (
        <View style={styles.authen}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Check Authorized...</Text>
        </View>
      )
    }
    else if (!(popularItem && newItem && recommend)) {
      return (
        <View style={styles.authen}>
          <ActivityIndicator size="large" color="red" />
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <SearchBar
          platform="android"
          placeholder="Search"
          containerStyle={styles.searchbar}
          inputContainerStyle={{marginTop: height*0.005}}
          onFocus = {()=> navigation.navigate('Search', {})}
        />
        <View style={styles.scroll}>
          <ScrollView>
            <MainCarousel newItem={newItem} navigate={navigation.navigate} />
            <View style={styles.iconrow}>
              <View style={styles.iconitem}>
                <Icon
                  name='gift'
                  type='font-awesome'
                  color='white'
                  raised
                  containerStyle={{backgroundColor:'red'}}
                  size={width*0.07}
                />
                <Text style={styles.texticon}>Only You</Text>
              </View>
              <View style={styles.iconitem}>
                <Icon
                  name='room-service'
                  type='material-community'
                  color='white'
                  raised
                  containerStyle={{backgroundColor: 'orange'}}
                  size={width*0.07}
                />
                <Text style={styles.texticon}>Room Service</Text>
              </View>
              <View style={styles.iconitem}>
                <Icon
                  name='apps'
                  type='material-community'
                  color='white'
                  raised
                  containerStyle={{backgroundColor: '#999'}}
                  size={width*0.07}
                  onPress={() => navigation.navigate('Category', {})}
                />
                <Text style={styles.texticon}>Category</Text>
              </View>
              <View style={styles.iconitem}>
                <Icon
                  name='qrcode'
                  type='font-awesome'
                  color='white'
                  raised
                  containerStyle={{backgroundColor:'green'}}
                  size={width*0.07}
                  onPress={() => navigation.navigate('QR', {})}
                />
                <Text style={styles.texticon}>QR-Scan</Text>
              </View>
            </View>
            <Recommend popular={popularItem} recommend={recommend} navigate={navigation.navigate}/>
          </ScrollView>
        </View>
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
  popularItem: ItemSelectors.popularItem(state),
  newItem: ItemSelectors.newItem(state),
  recommend: ItemSelectors.recommend(state),
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
  getPopular: ({ room }) => dispatch(ItemActions.getPopular({ room })),
  getNewItem: ({ room }) => dispatch(ItemActions.getNewItem({ room })),
  getRecommend: ({ room }) => dispatch(ItemActions.getRecommend({ room })),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(MainPage);
import { ActivityIndicator, BackHandler, Dimensions, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, ListItem, SearchBar, Text } from 'react-native-elements';
import { Col, Modal, Row } from 'antd-mobile';

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
import moment from 'moment';

const alert = Modal.alert;
const currency = 'Bath'
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
  listcontain: {
    height: height*0.16,
    width: width
  },
  titleitem: {
    fontSize: height*0.025,
    fontWeight: '300',
    color: '#000'
  },
  scroll: {
    height: height-50,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class HistoryPage extends React.Component {
  componentWillMount() {
    // fetch user info then set serverSide to false
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
    const { setLoading, getMe, navigation, getGuesthistory } = this.props;
    setLoading(true)
    getMe().then(
      () => {
        const { me } = this.props
        const room = me.username
        setLoading(false)
        Promise.all([getGuesthistory({ room })])
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

  clickAction = (status,reqID) => {
    const cancelBtn = this.cancelBtn
    alert(`Cancel request ${reqID}?`, `This request status is ${status=='Q' ? 'Request':'To-Do'}.`, [
      { text: 'No'},
      { text: 'Yes', onPress: () => {this.cancelBtn(reqID)}},
    ])
  }

  cancelBtn = reqID => {
    const { me, cancelRequest, getGuesthistory } = this.props;
    const username = me.username;
    const room = username;
    cancelRequest({reqID, username}).then(
      () => {
        setTimeout(() => {
          alert('Done', 'This request status change to Cancel', [
            { text: 'Ok', onPress: () => Promise.all([getGuesthistory({ room })])},
          ])
        }, 500);
      },
      (err) => {
        setTimeout(() => {
          alert('Error!!', 'Please Try Again Later', [
            { text: 'Ok'},
          ])
        }, 500);
      }
    )
  }

  dateFormat = time => {
    var d = moment(time)
    return d.format('lll')
  }

  render() {
    const { me, navigation, guesthistory } = this.props;
    if (!me) {
      return (
        <View style={styles.authen}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Check Authorized...</Text>
        </View>
      )
    }
    const dateFormat = this.dateFormat;
    const clickAction = this.clickAction;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.scroll}>
        <ScrollView>
        {
          guesthistory.map((l, i) => (
            <ListItem
              scaleProps={{
                friction: 90,
                tension: 100,
                activeScale: 0.95,
              }}
              containerStyle={styles.listcontain}
              key={i}
              leftAvatar={
                <Avatar
                  rounded={false}
                  source= {{ uri: l.image }}
                  containerStyle= {{height: height*0.10, width: height*0.12, backgroundColor: '#fff'}}
                  avatarStyle= {{height: height*0.10, width: height*0.12}}
                />
              }
              title={`ID: ${l.id} Item: ${l.itemName}`} 
              titleStyle={styles.titleitem} 
              subtitle={
                `status: ${l.status == 'R' ? `Paid\nAmount: ${l.amountReq}\nTime: ${this.dateFormat(l.time)}`:
                l.status == 'C' ? `Cancel\nTime: ${this.dateFormat(l.time)}`:
                l.status == 'A' ? `Accept\nAmount: ${l.amountReq}\nPrice: ${l.price} ${currency}\nTime: ${this.dateFormat(l.time)}`:
                l.status == 'S' ? `Buy\nAmount: ${l.amountReq}\nPrice: ${l.price}\nTime: ${this.dateFormat(l.time)}`:
                l.status == 'T' ? `To-Do\nAmount: ${l.amountReq}\nTime: ${this.dateFormat(l.time)}`:
                l.status == 'Q' ? `Request\nAmount: ${l.amountReq}\nTime: ${this.dateFormat(l.time)}`:''}`
              }
              rightIcon= {l.status == 'Q' || l.status == 'T' ? {size: height*0.1, name: 'chevron-right'} : {}}
              bottomDivider
              onPress={l.status == 'Q'|| l.status == 'T' ? () => clickAction(l.status, l.id):()=>{}}
            />
          ))
        }
        </ScrollView>
        </View>
        <View style={styles.tabBar}> 
          <TabMenu navigate={navigation.navigate} page='History'/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

HistoryPage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  me: LoginSelectors.me(state),
  guesthistory: ItemSelectors.guesthistory(state),
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
  getGuesthistory: ({ room }) => dispatch(ItemActions.getGuesthistory({ room })),
  cancelRequest: ({ reqID, username }) => dispatch(ItemActions.cancelRequest({ reqID, username })),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(HistoryPage);
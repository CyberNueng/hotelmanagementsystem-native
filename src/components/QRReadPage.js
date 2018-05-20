import { ActivityIndicator, BackHandler, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CommonActions from '../common/actions';
import ItemActions from '../modules/item/actions';
import ItemSelectors from '../modules/item/selectors';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import { Modal } from 'antd-mobile'
import QRCodeScanner from 'react-native-qrcode-scanner';
import React from 'react';
import TabMenu from '../layouts/TabMenu';
import { compose } from 'redux';
import { connect } from 'react-redux';

const currency = 'Bath'
const alert = Modal.alert;
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
  head: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    flex: 1,
    fontWeight: '500',
    fontSize: 22,
    color: '#000',
    paddingTop: 15,
  },
  subText: {
    flex: 1,
    fontSize: 18,
    color: '#777',
  },
  buttonText: {
    fontSize: 22,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

class QRCodePage extends React.Component {
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

  componentDidmount() {
    this.scanner.reactivate();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }

  setBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
    return true;
  }

  request = (itemID) => {
    const { requestItem } = this.props
    const username = this.props.me.username,
      amount = 1;
    requestItem({ username, itemID, amount }).then(
      () => {
        setTimeout(() => {
          alert('Done', 'This request has sent', [
            { text: 'Ok'},
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

  onSuccess(e) {
    const { getItemInfo } = this.props;
    const scanner = this.scanner
    try {
      readData = JSON.parse(e.data);
      const type = readData.type,
        itemID = readData.itemID;
      if(type=='Repair') {
        getItemInfo({ itemID }).then(
          () => {
            const { itemInfo } = this.props;
            alert(`Inform repair ${itemInfo[0].itemName}`, 'No cost but are you sure?', [
              { text: 'Cancel', onPress: () => scanner.reactivate()},
              { text: 'Ok', onPress: () => [scanner.reactivate()]},
            ])
          },
          (err) => {
            alert('Error!!', 'Please Try Again Later', [
              { text: 'Ok', onPress: () => scanner.reactivate()},
            ])
          }
        )
      } 
      if(type=='Request') {
        getItemInfo({ itemID }).then(
          () => {
            const { itemInfo } = this.props;
            var type = '';
            request = this.request
            switch(itemInfo[0].priceType) {
              case 'D':
                type = 'per day'
              case 'U':
                type = 'per ' + itemInfo[0].amountType
            }
            alert(`Request ${itemInfo[0].itemName}\n`+`Price: ${itemInfo[0].reqPrice} ${currency} ${type}`,
              <Image
                style={{height: width*1.1, width: width*1.5, marginTop: width*0.1, borderRadius: width*0.03}}
                source={{uri: itemInfo[0].image}}
                resizeMode="cover"
              />,
              [
                { text: 'Cancel', onPress: () => scanner.reactivate()},
                { text: 'Ok', onPress: () => [scanner.reactivate(),request(itemInfo[0].id)]},
              ]
            )
          },
          (err) => {
            alert('Error!!', 'Please Try Again Later', [
              { text: 'Ok', onPress: () => scanner.reactivate()},
            ])
          }
        )
      }
    } catch(er) {
      Linking.openURL(e.data).catch(err => {
        alert("Error!!", `QR Data: ${e.data}`, [
          { text: 'Ok' },
        ])
      });
      setTimeout(function(){ scanner.reactivate(); }, 2000);
    }
  }

  render() {
    const { navigation, me } = this.props;
    if (!me) {
      return (
        <View style={styles.authen}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Check Authorized...</Text>
        </View>
      )
    } 
    return (
      <View style={styles.container}>
        <QRCodeScanner
          ref={(node) => { this.scanner = node }}
          onRead={(e) => this.onSuccess(e)}
          topContent={
            <View style={styles.head}>
              <Text style={styles.headText}>QR-Code Scanner</Text>
              <Text style={styles.subText}>Use Camera Scan QR-Code</Text>
            </View>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable} onPress={()=>navigation.goBack()}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          }
          showMarker
        />
      </View>
    )
  }
}

QRCodePage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  me: LoginSelectors.me(state),
  itemInfo: ItemSelectors.itemInfo(state),
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
  getItemInfo: ({ itemID }) => dispatch(ItemActions.getItemInfo({ itemID })),
  requestItem: ({ username, itemID, amount }) => dispatch(ItemActions.requestItem({ username, itemID, amount })),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(QRCodePage);

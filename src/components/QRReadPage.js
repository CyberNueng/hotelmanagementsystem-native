import { ActivityIndicator, BackHandler, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CommonActions from '../common/actions';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import QRCodeScanner from 'react-native-qrcode-scanner';
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

  onSuccess(e) {
    try {
      readData = JSON.parse(e.data)
      if(readData.type=='Repair') {
        console.warn('Repair')
      } 
      if(readData.type=='Request') {
        console.warn('Request')
      }
    } catch(er) {
      console.warn('error'+er)
    }
    this.scanner.reactivate();
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
            <TouchableOpacity style={styles.buttonTouchable} onPress={()=>navigation.navigate('Home',{})}>
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
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(QRCodePage);
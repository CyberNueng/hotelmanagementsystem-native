import { ActivityIndicator, BackHandler, Dimensions, Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, SearchBar, Text } from 'react-native-elements';

import CommonActions from '../common/actions';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import React from 'react';
import { Stepper } from 'antd-mobile'
import TabMenu from '../layouts/TabMenu';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
    width: width,
    height: height-50,
    backgroundColor: '#FFF',
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
  maindetail:{
    height: height*0.15,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#DDD',
    borderTopWidth: 1,
  },
  leftdetail: {
    width: width*0.475,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middledetail: {
    width: width*0.275,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightdetail: {
    width: width*0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1 //- from tabBar and serachber
  },
  mainpic: {
    height: height*0.4,
    backgroundColor: '#EEE'
  },
  itemname: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: height*0.033,
    fontWeight: '400',
    color: '#000'
  },
  itemdetail: {
    paddingLeft: 15,
    fontSize: height*0.022,
    color: '#111'
  },
  itemprice: {
    fontSize: height*0.055,
    fontWeight: '600',
    color: '#f70'
  },
  itemcurrency: {
    fontSize: height*0.033,
    fontWeight: '300',
    color: '#f70'
  },
});

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 1,
      itemName: props.navigation.state.params.itemInfo.itemName,
      image: props.navigation.state.params.itemInfo.image,
      itemType: props.navigation.state.params.itemInfo.itemType,
      itemDescription: props.navigation.state.params.itemInfo.itemDescription,
      reqPrice: props.navigation.state.params.itemInfo.reqPrice,
      btnText: 'TAKE',
      priceType: props.navigation.state.params.itemInfo.priceType,
    }
  }

  componentWillMount() {
    // fetch user info then set serverSide to false
    Keyboard.dismiss();
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
    const { setLoading, getMe, navigation, me } = this.props;
    const { priceType } = this.state
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
    this.setState({priceTypeText: currency + ' ' + priceType})
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }

  setBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
    return true;
  }

  requestHandle = () => {
    
  }

  onChange = (val) => {
    this.setState({ val });
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
    const { priceTypeText, reqPrice, itemName, image, itemDescription, btnText } = this.state
    return (
      <View>
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
              <Image style={styles.mainpic} resizeMode="cover" resizeMode="contain" source={{uri: image}} />
              <Text style={styles.itemname}>{itemName}</Text>
              <Text style={styles.itemdetail}>{itemDescription}</Text>
            </ScrollView>
          </View>
          <View style={styles.maindetail}>
            <View style={styles.leftdetail}>
              <Text style={styles.itemprice}>{reqPrice}</Text>
              <Text style={styles.itemcurrency}>{priceTypeText}</Text>
            </View>
            <View style={styles.middledetail}>
              <Text style={{paddingTop: height*0.025, fontSize: height*0.025}}>amount</Text>
              <Stepper
                style={{ width: '100%', height: '100%', paddingBottom: height*0.025 }}
                showNumber
                max={100}
                min={1}
                value={this.state.val}
                onChange={this.onChange}
              />
            </View>
            <View style={styles.rightdetail}>
              <Button
                large backgroundColor='blue'
                title={btnText}
                onPress={this.requestHandle}
                containerStyle={{ justifyContent: 'center' }}
                buttonStyle={{ height: '80%', width: width*0.21}}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.tabBar}> 
            <TabMenu navigate={navigation.navigate} page='Item'/>
        </View>
      </View>
    )
  }
}

ItemPage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  me: LoginSelectors.me(state),
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(ItemPage);
import { ActivityIndicator, BackHandler, Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements'

import CommonActions from '../common/actions';
import Fuse from 'fuse.js'
import ItemActions from '../modules/item/actions';
import ItemSelectors from '../modules/item/selectors';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import React from 'react';
import _ from 'lodash'
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
  searchbar: {
    height: 50,
    justifyContent: 'center',
    elevation: 3,
  },
  listcontain: {
    height: (height-74)*0.2
  },
  titleitem: {
    fontSize: height*0.03,
    fontWeight: '300',
    color: '#000'
  }
});

const allItemFuseOptions = {
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 25,
  minMatchCharLength: 1,
  keys: ['itemName', 'itemDescription']
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: props.navigation.state.params.recommendtxt ? props.navigation.state.params.recommendtxt:''
    }
  }

  onChange = text => {
    if (this.props.onChange) return this.props.onChange(text)
    if (this.props.onChange === null) return () => null
    return _.debounce(text => this.setState({ searchText: text }), 500)(text)
  }

  filter = allItem => {
    if (this.props.filter) return this.props.filter(allItem)
    if (this.props.filter === null) return () => null
    const fuseAllItem = new Fuse(allItem, allItemFuseOptions)
    const filterList = this.state.searchText !== '' ? fuseAllItem.search(this.state.searchText) : []
    return filterList
  }
  componentWillMount() {
    // fetch user info then set serverSide to false
    const { setLoading, getMe, navigation, me, getAllItem } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
    setLoading(true)
    getMe().then(
      () => {
        const { me } = this.props
        const room = me.username
        setLoading(false)
        Promise.all([getAllItem({ room })])
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
    const { me, allItem, navigation } = this.props;
    const filterList = this.filter(allItem)
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
          containerStyle={styles.searchbar}
          inputContainerStyle={{marginTop: height*0.005}}
          autoFocus
          ref={search => this.search = search}
          onChangeText={text => this.onChange(text)}
        />
        <ScrollView>
        {
          filterList ? filterList.map((l, i) => (
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
                  containerStyle= {{height: height*0.12, width: height*0.15, backgroundColor: '#fff'}}
                  avatarStyle= {{height: height*0.12, width: height*0.15}}
                />
              }
              title={l.itemName}
              titleStyle={styles.titleitem}
              subtitle={l.priceType == 'U' ? `${l.reqPrice} / ${l.amountType}`:`${l.reqPrice} / day`}
              rightIcon={{size: height*0.1, name: 'chevron-right'}}
              bottomDivider
              onPress={() => navigation.navigate('Item', {itemInfo: l})}
            />
          )) : (
            <View>
            </View>
          )
        }
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

SearchPage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  me: LoginSelectors.me(state),
  allItem: ItemSelectors.allItem(state),
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
  getAllItem: ({ room }) => dispatch(ItemActions.getAllItem({ room })),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(SearchPage);
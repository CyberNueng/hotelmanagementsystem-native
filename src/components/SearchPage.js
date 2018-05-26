import { ActivityIndicator, BackHandler, Dimensions, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import CommonActions from '../common/actions';
import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import React from 'react';
import { SearchBar } from 'react-native-elements'
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
});

const itemListFuseOptions = {
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 25,
  minMatchCharLength: 1,
  keys: ['id', 'itemName']
}

class SearchPage extends React.Component {
  state = {
    searchText: ''
  }

  onSearch = searchText => this.setState({ searchText })
  
  onChange = e => {
    if (this.props.onChange) return this.props.onChange(e)
    if (this.props.onChange === null) return () => null
    e.persist()
    return _.debounce(e => this.setState({ searchText: e.target.value }), 500)(e)
  }

  filter = allItem => {
    if (this.props.filter) return this.props.filter(allItem)
    if (this.props.filter === null) return () => null
    const fuseAllItem = new Fuse(allItem, allItemFuseOptions)
    const filterList = this.state.searchText !== '' ? fuseAllItem.search(this.state.searchText) : allItem
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
        getAllItem({ room })
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
    const { me, allItem } = this.props;
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
  loginStatus: LoginSelectors.loginStatus(state),
  allItem: ItemSelectors.allItem(state),
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(LoginActions.me()),
  login: ({ username, password }) => dispatch(LoginActions.login({ username, password })),
  setLoading: status => dispatch(CommonActions.isLoading(status)),
  getAllItem: ({ room }) => dispatch(ItemActions.getAllItem({ room })),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(SearchPage);
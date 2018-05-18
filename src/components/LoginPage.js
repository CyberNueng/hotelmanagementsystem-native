import { Button, Input, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';

import LoginActions from '../modules/login/actions';
import LoginSelectors from '../modules/login/selectors';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginzone: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  logintext: {
    color: '#000',
    marginBottom: 10
  }
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      roomnameErr: null,
      passwordErr: null,
    }
  }

  onSubmit = () => {
    const { username, password } = this.state;
    const { login, loginStatus, navigation } = this.props;
    if(username=='' && password==''){
      this.onRoomNameChange('');
      this.onPassChange('');
    }else
      login({ username, password })
        .catch((err) => {
          this.setState({roomnameErr: 'Please check room name'})
          this.setState({passwordErr: 'Please check password'})
        })

  }

  onRoomNameChange = text => {
    this.setState({username: text})
    if(text==''){
      this.setState({roomnameErr: 'Please input room name'})
    } else {
      this.setState({roomnameErr: null})
    }
  }

  onPassChange = text => {
    this.setState({password: text})
    if(text==''){
      this.setState({passwordErr: 'Please input password'})
    } else {
      this.setState({passwordErr: null})
    }
  }

  render() {
    const { login, loginStatus, navigation } = this.props;
    const { roomnameErr, passwordErr } = this.state;
    if(loginStatus){
      setTimeout(() => {
        navigation.navigate('Main', {})
      }, 2000);
    }
    return (
      <View style={styles.container}>
        <View style={styles.loginzone}> 
          <Text h2 style={styles.logintext}>SIGN IN</Text>
          <Input
            placeholder='Room Name'
            onChangeText={text => this.onRoomNameChange(text)}
            errorStyle={{ color: 'red' }}
            errorMessage={roomnameErr}
            autoFocus
          />
          <Input
            placeholder='Password'
            onChangeText={text => this.onPassChange(text)}
            errorStyle={{ color: 'red' }}
            errorMessage={passwordErr}
            secureTextEntry
          />
          <Button
            large backgroundColor='blue'
            onPress={this.onSubmit}
            title='SIGN IN'
            containerStyle={{marginTop: 15, marginBottom: 12}}
          />
        </View>
      </View>
    )
  }
}

LoginPage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  loginStatus: LoginSelectors.loginStatus(state)
});

const mapDispatchToProps = dispatch => ({
  login: ({ username, password }) => dispatch(LoginActions.login({ username, password }))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(LoginPage);
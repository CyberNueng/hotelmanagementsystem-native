const selectors = {
  loginStatus: state => state.login.loginStatus.data,
  logoutStatus: state => state.login.logoutStatus.data,
  me: state => state.login.me.data,
}

export default selectors

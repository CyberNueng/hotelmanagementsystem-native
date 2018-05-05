const selectors = {
  isLoading: state => state.common.isLoading,
  notifyMessage: state => state.common.notifyMessage,
  location: state => state.router.location
}

export default selectors

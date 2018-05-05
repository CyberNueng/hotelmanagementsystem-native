import CommonActions from '../../actions'

function createAction(actionName, { setToDefaultIfError = true, setLoading = true } = {}) {
  return {
    reset: () => ({
      type: `RESET_${actionName}`
    }),
    fetch: function(api, ...params) {
      return dispatch => {
        if (setLoading) dispatch(CommonActions.isLoading(true));
        dispatch({ type: `FETCH_START_${actionName}` });
        return api(...params).then(
          result => {
            if (setLoading) dispatch(CommonActions.isLoading(false));
            dispatch({
              type: `FETCH_SUCCESS_${actionName}`,
              payload: result
            });
            return result;
          },
          err => {
            if (setLoading) dispatch(CommonActions.isLoading(false));
            dispatch({
              type: `FETCH_ERROR_${actionName}`,
              error: true,
              payload: err,
              setToDefaultIfError
            });
            return Promise.reject(err);
          }
        )
      }
    },
    request: function(api, ...params) {
      return dispatch => {
        if (setLoading) dispatch(CommonActions.isLoading(true));
        dispatch({ type: `REQUEST_START_${actionName}` });
        return api(...params).then(
          result => {
            if (setLoading) dispatch(CommonActions.isLoading(false))
            dispatch({
              type: `REQUEST_SUCCESS_${actionName}`,
              payload: result
            });
            return result;
          },
          err => {
            if (setLoading) dispatch(CommonActions.isLoading(false));
            dispatch({
              type: `REQUEST_ERROR_${actionName}`,
              error: true,
              payload: err,
              setToDefaultIfError
            });
            return Promise.reject(err);
          }
        )
      }
    }
  }
}

export default createAction

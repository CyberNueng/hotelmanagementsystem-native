import { handleActions } from 'redux-actions'

const _defaultState = {
  isFetching: false,
  data: undefined,
  message: '',
  success: false,
  code: 0
}

function createReducer(actionName, defaultData = undefined) {
  const defaultState = Object.assign({}, _defaultState, { data: defaultData });

  return handleActions(
    {
      [`FETCH_START_${actionName}`]: state => ({ ...state, isFetching: true }),
      [`FETCH_SUCCESS_${actionName}`]: (state, action) => {
        return { ...state, isFetching: false, ...action.payload };
      },
      [`FETCH_ERROR_${actionName}`]: (state, action) => {
        state = { ...state, isFetching: false, ...action.payload };
        return action.setToDefaultIfError ? { ...state, ...defaultState } : { ...state };
      },
      [`REQUEST_START_${actionName}`]: state => ({ ...state, isFetching: true }),
      [`REQUEST_SUCCESS_${actionName}`]: state => {
        return { ...state, isFetching: false };
      },
      [`REQUEST_ERROR_${actionName}`]: (state, action) => {
        state = { ...state, isFetching: false, ...action.payload }
        return action.setToDefaultIfError ? { ...state, ...defaultState } : { ...state };
      },
      [`RESET_${actionName}`]: () => ({ ...defaultState })
    },
    { ...defaultState }
  )
}

export default createReducer;

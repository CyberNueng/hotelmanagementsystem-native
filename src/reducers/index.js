import { AppNavigator } from '../navigators/AppNavigator';
import { NavigationActions } from 'react-navigation';
import { combineReducers } from 'redux';
import loginReducers from '../modules/login/reducers'

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
//const tempNavState = AppNavigator.router.getStateForAction(firstAction);
//const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

/*function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}*/

const AppReducer = combineReducers({
  nav,
  login: loginReducers,
});

export default AppReducer;

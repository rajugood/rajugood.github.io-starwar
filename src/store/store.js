import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export function configureStore(initialState = { userState: {isLoggedIn: sessionStorage.getItem('login') === 'true'? true : false, name: sessionStorage.getItem('name') || ''}}) {
  const middlewares = [
    thunk,
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );
  return store;
}
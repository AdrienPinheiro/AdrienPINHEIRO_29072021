import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.min.css';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import logger from 'redux-logger'
import { getUsers } from './actions/users.actions';

const store = createStore (
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

store.dispatch(getUsers());

ReactDOM.render(
  <Provider store={store}>
    <App/>,
  </Provider>,
  document.getElementById('root')
);

//import logger from 'redux-logger'
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
import { getUsers } from './actions/users.actions';
import axios from 'axios';
import Cookies from 'universal-cookie';

const store = createStore (
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

let token = new Cookies().get('session_id');

axios.defaults.headers.post['session_id'] = token
axios.defaults.headers.put['session_id'] = token
axios.defaults.headers.delete['session_id'] = token

store.dispatch(getUsers());

ReactDOM.render(
  <Provider store={store}>
    <App/>,
  </Provider>,
  document.getElementById('root')
);

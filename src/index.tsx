import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './assets/css/sidemenu.css';
import './assets/css/style.css';
import './assets/css/style1.css';
import './assets/css/style2.css';
import './assets/css/style-dark.css';
import './assets/css/boxed.css';
import './assets/css/dark-boxed.css';
import './assets/css/skin-modes.css';
import './assets/css/animate.css';
import App from './App';
import { persistor, store } from './redux/store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

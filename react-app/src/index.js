import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store/index';

const currStore = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={currStore.store}>
      <PersistGate loading={null} persistor={currStore.persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

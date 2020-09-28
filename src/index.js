import React from "react";
import ReactDOM from "react-dom";
import './styles.css';
import { Provider } from "react-redux";
// import { createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import App from "./app";
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
    immutableCheck: true
  }),
});
// const store = createStore(rootReducer);
/* global document */
const mountNode = document.getElementById("app");
ReactDOM.render(

  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App> </App>
  </Provider>,

  mountNode);

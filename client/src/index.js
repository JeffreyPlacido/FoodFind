import React from "react";
import ReactDOM from "react-dom";
// import configureStore from "./store";
// import { Provider } from "react-redux";
import App from "./components/App";
import AuthProvider from "./components/AuthContext";

// const store = configureStore();

ReactDOM.render(
  // <Provider store={store}>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </Provider>,

  document.getElementById("root")
);

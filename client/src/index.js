import React from "react";
import ReactDOM from "react-dom";
// import configureStore from "./store";
// import { Provider } from "react-redux";
import App from "./components/App";
import GlobalStyles from "./components/GlobalStyles";
import AuthProvider from "./components/AuthContext";

// const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { ReactNotifications } from "react-notifications-component";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./shared/infrastructure/store/store";
import AppTheme from "./shared/themes/AppTheme";

// TODO: Pro překlady použiju dictionary [key: string]: string. data["cs"]
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={AppTheme}>
          <CssBaseline />
          <ReactNotifications />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

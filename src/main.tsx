import "./globals.css";
import "./index.css";
import App from "./App";
import React from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster position="top-center" />
    </Router>
  </React.StrictMode>
);

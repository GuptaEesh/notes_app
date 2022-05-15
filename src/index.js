import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, DataProvider, FilterProvider } from "./helpers/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Index from "./ShopingCart/Index";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import Store from "./App/store/redux-toolkit";
import App from "./App";

const client = new QueryClient();

ReactDOM.render(
  <Provider store={Store}>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);

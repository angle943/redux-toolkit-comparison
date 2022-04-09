import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Index from "./ShopingCart/Index";
import { QueryClient, QueryClientProvider } from "react-query";

// import { Provider } from "react-redux";
// import Store from "./App/store/redux-toolkit";
// import App from "./App";

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <Index />
  </QueryClientProvider>,
  document.getElementById("root")
);

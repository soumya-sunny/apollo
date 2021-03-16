import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, Reference } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: "http://localhost:4001/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
         
          quotes: {
            keyArgs: false,
            merge(existing, incoming) {
              let quotes=  [];
              // if (existing && existing.quotes) {
              //   quotes = quotes.concat(existing.quotes);
              // }
              if (incoming && incoming.quotes) {
                quotes = quotes.concat(incoming.quotes);
              }
              return {
                ...incoming,
                quotes,
              };
            }
          }
        }
      }
    }})
});


ReactDOM.render(
  <React.StrictMode>
<BrowserRouter>
<ChakraProvider>
    <App client={client} />
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

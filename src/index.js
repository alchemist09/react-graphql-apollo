import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import reportWebVitals from './reportWebVitals';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if(graphQLErrors) {
    // handle graphql errors
    graphQLErrors.forEach(({ message, location, path }) => {
      console.log(
        `[GraphQL Error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    })
  }

  if(networkError) {
    // handle network error
    console.log(`[Network Error]: ${networkError}`)
  }
})

const GITHUB_BASE_URI = `https://api.github.com/graphql`

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URI,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
  }
})

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

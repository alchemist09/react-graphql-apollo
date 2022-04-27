import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        viewer: {
          keyArgs: false,
          merge(existing={}, incoming) {
            console.log("EXISTING: ", existing)
            console.log("INCOMING: ", incoming)
            console.log("typeof INCOMING: ", typeof incoming.login)
            console.log("REPO EDGES: ", incoming.repositories)
            console.log("hasOwnProperty - repos: ", existing.hasOwnProperty("repositories"))
            return {
              ...existing,
              ...incoming
            }
          }
        },
        organization: {
          keyArgs: false,
          merge(existing={}, incoming) {
            console.log("ORGANIZATION EXISTING: ", existing)
            console.log("ORGANIZATION INCOMING: ", incoming)
            return {
              ...existing,
              ...incoming
            }
          }
        }
      }
    },
    User: {
      fields: {
        keyArgs: false,
        repositories: {
          keyArgs: false,
          merge(existing={}, incoming) {
            console.log("REPO EXISTING: ", existing)
            console.log("REPO INCOMING: ", incoming)
            console.log("typeof edges: ", typeof incoming.edges)
            return {
              ...existing,
              ...incoming
            }
          }
        }
      }
    },
    Organization: {
      fields: {
        keyArgs: false,
        repositories: {
          keyArgs: false,
          merge(existing={}, incoming) {
            console.log("ORG REPOOS EXISTING: ", existing)
            console.log("ORG REPOOS INCOMING: ", incoming)
            return {
              ...existing,
              ...incoming
            }
          }
        }
      }
    },
    RepositoryConnection: {
      fields: {
        keyArgs: false,
        edges: {
          merge(existing=[], incoming) {
            console.log("CONNECTION EXISTING: ", existing)
            console.log("CONNECTION INCOMING: ", incoming)
            return [
              ...existing,
              ...incoming
            ]
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

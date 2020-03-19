import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";

import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Navbar";
import Search from "./components/Recipe/Search";
import AddAsset from "./components/Asset/AddAsset";
import AddDebt from "./components/Debt/AddDebt";
import AssetPage from "./components/Asset/AssetPage";
import DebtPage from "./components/Debt/DebtPage";
import RecipePage from "./components/Recipe/RecipePage";
import Profile from "./components/Profile/Profile";
import withSession from "./components/withSession";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError, graphQLErrors }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
    if (graphQLErrors) {
      console.log("graphQLErrors", graphQLErrors);
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route
          path="/asset/add"
          render={() => <AddAsset session={session} />}
        />
        <Route path="/debt/add" render={() => <AddDebt session={session} />} />
        <Route path="/asset/:_id" component={AssetPage} />
        <Route path="/debt/:_id" component={DebtPage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);

import React from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../queries";

const App = () => (
  <div className="App">
    <Query query={GET_CURRENT_USER}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error - Sign In Please</div>;
        return (
          <div>
            <h3>
              Welcome{" "}
              {data.getCurrentUser
                ? data.getCurrentUser.username
                : "to GoalKeeper"}
            </h3>
            <p>
              {data.getCurrentUser
                ? "Let's Checkout your goals(let's make this a link)"
                : "Sign in to get started"}
            </p>
          </div>
        );
      }}
    </Query>
  </div>
);

export default App;

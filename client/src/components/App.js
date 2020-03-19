import React from "react";
import "./App.css";

import UserAssets from "./Profile/UserAssets";
import UserDebts from "./Profile/UserDebts";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../queries";

const App = () => (
  <div className="App">
    <Query query={GET_CURRENT_USER}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error - Sign In Please</div>;
        console.log(data);
        return (
          <div>
            <h3>
              Welcome{" "}
              {data.getCurrentUser
                ? data.getCurrentUser.username
                : "to GoalKeeper"}
            </h3>
            <h4>Here's a breakdown of your current financials</h4>
            {data.getCurrentUser ? (
              <div>
                <UserAssets user={data.getCurrentUser._id} />
                <UserDebts user={data.getCurrentUser._id} />
              </div>
            ) : (
              <p>"Sign in to get started"</p>
            )}
          </div>
        );
      }}
    </Query>
  </div>
);

export default App;

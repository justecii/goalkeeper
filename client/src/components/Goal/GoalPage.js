import React from "react";

import { withRouter } from "react-router-dom";
import ProgressBar from "./ProgressBar";

import { Query } from "react-apollo";
import { GET_GOAL } from "../../queries";

const GoalPage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_GOAL} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        return (
          <div className="App">
            <div className="TODO">
              <h2>{data.getGoal.name}</h2>
              <p>Category: {data.getGoal.category}</p>
              <p>Target: {data.getGoal.goalTarget}</p>
              <p>Current Progress: {data.getGoal.currentProgress}</p>
            </div>
            <div className="TODO">
              <ProgressBar />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(GoalPage);

import React from "react";

import { withRouter } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import withAuth from "../withAuth";

import { Query, Mutation } from "react-apollo";
import { GET_GOAL, DELETE_USER_GOAL } from "../../queries";

class GoalPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(deleteUserGoal) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (confirmDelete) {
      deleteUserGoal().then(({ data }) => {
        console.log(data);
        this.props.history.push("/profile");
      });
    }
  }
  componentDidMount() {
    this.setState({
      username: this.props.location.state.username
    });
  }
  render() {
    console.log(this.props.location.state.username);
    const { _id } = this.props.match.params;
    return (
      <Query query={GET_GOAL} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          return (
            <div className="App">
              <div className="TODO">
                <h2>{data.getGoal.name}</h2>
                <Mutation
                  mutation={DELETE_USER_GOAL}
                  variables={{ _id: data.getGoal._id }}
                >
                  {(deleteUserGoal, attrs = {}) => {
                    return (
                      <button
                        className="delete-button"
                        onClick={() => this.handleDelete(deleteUserGoal)}
                      >
                        {attrs.loading ? "deleting..." : "X"}
                      </button>
                    );
                  }}
                </Mutation>
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
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(GoalPage)
);

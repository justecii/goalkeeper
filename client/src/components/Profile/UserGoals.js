import React from "react";
import { Link } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import { GET_USER_GOALS, GET_CURRENT_USER } from "../../queries";

const handleDelete = deleteUserRecipe => {
  // hide for now
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this recipe?"
  //   );
  //   if (confirmDelete) {
  //     deleteUserRecipe().then(({ data }) => {
  //       console.log(data);
  //     });
  //   }
};

class UserGoals extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <Query query={GET_USER_GOALS} variables={{ username }}>
        {/* CHeck these stupid curly braces below... need for what's being descructured  */}
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);
          return (
            <ul>
              <h3>Your Goals</h3>
              {!data.getUserGoals.length && (
                <p>
                  <strong>You have not added any goals yet</strong>
                </p>
              )}
              {data.getUserGoals.map(goals => (
                <li key={goals._id}>
                  <Link
                    to={{
                      pathname: `/goal/${goals._id}`,
                      state: { username: username }
                    }}
                  >
                    <p style={{ marginBottom: "0" }}>{goals.name}</p>
                  </Link>
                  <p>Target: {goals.goalTarget}</p>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default UserGoals;

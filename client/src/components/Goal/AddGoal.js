import React from "react";
import { withRouter } from "react-router-dom";

import { Mutation } from "react-apollo";
import { ADD_GOAL, GET_USER_GOALS } from "../../queries";
import Error from "../Error";
import withAuth from "../withAuth";

const initialState = {
  name: "",
  category: "Financial",
  goalTarget: "",
  currentProgress: "",
  username: ""
};
class AddGoal extends React.Component {
  state = {
    ...initialState
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, addGoal) => {
    event.preventDefault();
    addGoal().then(({ data }) => {
      this.clearState();
      this.props.history.push("/");
    });
  };
  validateForm = () => {
    const { name, category, goalTarget } = this.state;
    const isInvalid = !name || !category || !goalTarget;
    return isInvalid;
  };

  // need to update this
  updateCache = (cache, { data: { addGoal } }) => {
    // const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    // console.log("from cache", getAllRecipes);
    // console.log("from data", addRecipe);
    // cache.writeQuery({
    //   query: GET_ALL_RECIPES,
    //   data: {
    //     getAllRecipes: [addRecipe, ...getAllRecipes]
    //   }
    // });
    console.log(cache);
  };
  // update refetchQueries with GET_USER_GOALS
  render() {
    const {
      name,
      category,
      goalTarget,
      currentProgress,
      username
    } = this.state;
    return (
      <Mutation
        mutation={ADD_GOAL}
        variables={{
          name,
          category,
          goalTarget,
          currentProgress,
          username
        }}
        refetchQueries={() => [
          { query: GET_USER_GOALS, variables: { username } }
        ]}
      >
        {(addGoal, { data, loading, error }) => {
          return (
            <div className="App">
              <h2>Add Goal</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addGoal)}
              >
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Goal Name"
                  value={name}
                />
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Financial">Financial</option>
                  <option value="Habit">Habit</option>
                  <option value="Health">Health</option>
                  <option value="Weight">Weight</option>
                </select>

                <input
                  type="text"
                  name="goalTarget"
                  onChange={this.handleChange}
                  placeholder="Add Target"
                  value={goalTarget}
                />
                <input
                  type="text"
                  name="currentProgress"
                  onChange={this.handleChange}
                  placeholder="What's your current progress?"
                  value={currentProgress}
                />
                <button
                  type="submit"
                  disabled={loading || this.validateForm()}
                  className="submit-button"
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddGoal)
);

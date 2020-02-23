import React from "react";
import { withRouter } from "react-router-dom";

import { Mutation } from "react-apollo";
import { ADD_GOAL, GET_USER_GOALS } from "../../queries";
import Error from "../Error";
import withAuth from "../withAuth";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";

const initialState = {
  name: "",
  category: "",
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
      console.log(data.addGoal._id);
      this.clearState();
      this.props.history.push(`/goal/${data.addGoal._id}`);
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
  render() {
    const {
      name,
      category,
      goalTarget,
      currentProgress,
      username
    } = this.state;

    let targetPlaceholder, currentPlaceholder;

    switch (this.state.category) {
      case "Financial":
        targetPlaceholder = "How much would you like to save";
        currentPlaceholder = "What is your current savings";
        break;
      case "Habit":
        targetPlaceholder = "How Many hours a week?";
        currentPlaceholder = "How often now?";
        break;
      case "Health":
        targetPlaceholder = "What is your goal?";
        currentPlaceholder = "What is your current status?";
        break;
      case "Weight":
        targetPlaceholder = "What is your ideal weight?";
        currentPlaceholder = "What is your current weight?";
        break;
      default:
        targetPlaceholder = "Target";
        currentPlaceholder = "Current";
    }

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
            <Container component="main" maxWidth="xs">
              <div className="paper">
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Avatar className="avatar">
                      <SportsHandballIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h5">
                      Add Goal
                    </Typography>
                  </Grid>
                </Grid>
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, addGoal)}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    onChange={this.handleChange}
                    label="What is your goal?"
                    value={name}
                  />
                  <FormControl>
                    <InputLabel>What type of goal?</InputLabel>
                    <Select
                      name="category"
                      label=""
                      onChange={this.handleChange}
                      value={category}
                    >
                      <MenuItem value="Financial">Financial</MenuItem>
                      <MenuItem value="Habit">Habit</MenuItem>
                      <MenuItem value="Health">Health</MenuItem>
                      <MenuItem value="Weight">Weight</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    id="goalTarget"
                    name="goalTarget"
                    onChange={this.handleChange}
                    label={targetPlaceholder}
                    value={goalTarget}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    id="currentProgress"
                    name="currentProgress"
                    onChange={this.handleChange}
                    label={currentPlaceholder}
                    value={currentProgress}
                  />
                  <Button
                    type="submit"
                    disabled={loading || this.validateForm()}
                    className="submit-button"
                    fullWidth
                  >
                    Submit
                  </Button>
                  {error && <Error error={error} />}
                </form>
              </div>
            </Container>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddGoal)
);

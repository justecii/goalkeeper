import React from "react";
import { withRouter } from "react-router-dom";

import { Mutation } from "react-apollo";
import { ADD_DEBT, GET_USER_DEBTS } from "../../queries";
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
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const initialState = {
  name: "",
  category: "",
  currentDebt: "",
  totalCreditLine: "",
  interestRate: "1",
  debtAtCreation: "",
  user: ""
};
class AddDebt extends React.Component {
  state = {
    ...initialState
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount() {
    this.setState({
      user: this.props.session.getCurrentUser._id
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (name === "debtAtCreation") {
      this.setState({
        currentDebt: value
      });
    }
  };

  handleSubmit = (event, addDebt) => {
    event.preventDefault();
    addDebt().then(({ data }) => {
      console.log(data.addDebt._id);
      this.clearState();
      this.props.history.push(`/debt/${data.addDebt._id}`);
    });
    console.log(this.state);
  };
  validateForm = () => {
    const { name, category, debtAtCreation } = this.state;
    const isInvalid = !name || !category || !debtAtCreation;
    return isInvalid;
  };

  // need to update this
  updateCache = (cache, { data: { addDebt } }) => {
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
      currentDebt,
      totalCreditLine,
      interestRate,
      debtAtCreation,
      user
    } = this.state;

    let valuePlaceholder, availableCredit;

    switch (this.state.category) {
      case "Credit Card":
        valuePlaceholder = "Current Debt";
        availableCredit = "Card Limit";
        break;
      case "Loan":
        valuePlaceholder = "Loan Value";
        availableCredit = "Initial Value";
        break;
      case "Misc":
        valuePlaceholder = "Value";
        availableCredit = "Initial Value/Limit";
        break;
      default:
        valuePlaceholder = "Value";
        availableCredit = "Initial Value/Limit";
    }

    return (
      <Mutation
        mutation={ADD_DEBT}
        variables={{
          name,
          category,
          currentDebt,
          totalCreditLine,
          interestRate,
          debtAtCreation,
          user
        }}
        refetchQueries={() => [{ query: GET_USER_DEBTS, variables: { user } }]}
      >
        {(addDebt, { data, loading, error }) => {
          return (
            <Container component="main" maxWidth="xs">
              <div className="paper">
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <Avatar className="avatar background-red">
                      <CreditCardIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <h3 className="red form-header">Add Account</h3>
                  </Grid>
                </Grid>
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, addDebt)}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    onChange={this.handleChange}
                    label="Debt Title"
                    value={name}
                  />
                  <FormControl>
                    <InputLabel>What type of Debt?</InputLabel>
                    <Select
                      name="category"
                      label=""
                      onChange={this.handleChange}
                      value={category}
                    >
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Loan">Loan</MenuItem>
                      <MenuItem value="Misc">Miscellaneous</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    id="debtAtCreation"
                    name="debtAtCreation"
                    onChange={this.handleChange}
                    label={valuePlaceholder}
                    value={debtAtCreation}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    id="interestRate"
                    name="interestRate"
                    onChange={this.handleChange}
                    label={"Interest Rate"}
                    value={interestRate}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    id="totalCreditLine"
                    name="totalCreditLine"
                    onChange={this.handleChange}
                    label={availableCredit}
                    value={totalCreditLine}
                  />

                  <Button
                    type="submit"
                    disabled={loading || this.validateForm()}
                    className="submit-button"
                    fullWidth
                  >
                    <AddCircleOutlineIcon /> Submit
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
  withRouter(AddDebt)
);

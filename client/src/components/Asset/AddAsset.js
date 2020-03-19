import React from "react";
import { withRouter } from "react-router-dom";

import { Mutation } from "react-apollo";
import { ADD_ASSET, GET_USER_ASSETS } from "../../queries";
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
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const initialState = {
  name: "",
  category: "",
  currentValue: "",
  interestRate: "1",
  quantity: 1,
  user: ""
};
class AddAsset extends React.Component {
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
  };

  handleSubmit = (event, addAsset) => {
    event.preventDefault();
    addAsset().then(({ data }) => {
      console.log(data.addAsset._id);
      this.clearState();
      this.props.history.push(`/asset/${data.addAsset._id}`);
    });
    console.log(this.state);
  };
  validateForm = () => {
    const { name, category, currentValue } = this.state;
    const isInvalid = !name || !category || !currentValue;
    return isInvalid;
  };

  // need to update this
  updateCache = (cache, { data: { addAsset } }) => {
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
      currentValue,
      interestRate,
      quantity,
      user
    } = this.state;

    let valuePlaceholder, interestQuantity, quantityCondition;
    let interestQuestion = (
      <TextField
        margin="normal"
        required
        fullWidth
        type="text"
        id="interestRate"
        name="interestRate"
        onChange={this.handleChange}
        label={"Interest Rate"}
        value={interestRate}
      />
    );
    let quantityQuestion = (
      <TextField
        margin="normal"
        required
        fullWidth
        type="number"
        id="quantity"
        name="quantity"
        onChange={this.handleChange}
        label="Quantity"
        value={quantity}
      />
    );

    switch (this.state.category) {
      case "Savings":
        valuePlaceholder = "Account Value";
        quantityCondition = interestQuestion;
        break;
      case "Checking":
        valuePlaceholder = "Account Value";
        quantityCondition = interestQuestion;
        break;
      case "Stock":
        valuePlaceholder = "Stock Value";
        quantityCondition = quantityQuestion;
        interestQuantity = "Quantity";
        break;
      case "Misc":
        valuePlaceholder = "Value";
        quantityCondition = interestQuestion;
        break;
      default:
        valuePlaceholder = "Value";
        quantityCondition = interestQuestion;
    }

    return (
      <Mutation
        mutation={ADD_ASSET}
        variables={{
          name,
          category,
          currentValue,
          interestRate,
          quantity,
          user
        }}
        refetchQueries={() => [{ query: GET_USER_ASSETS, variables: { user } }]}
      >
        {(addAsset, { data, loading, error }) => {
          return (
            <Container component="main" maxWidth="xs">
              <div className="paper">
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <Avatar className="avatar background-green">
                      <AccountBalanceIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <h3 className="green form-header">Add Asset</h3>
                  </Grid>
                </Grid>
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, addAsset)}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    onChange={this.handleChange}
                    label="Asset Title"
                    value={name}
                  />
                  <FormControl>
                    <InputLabel>What type of Asset?</InputLabel>
                    <Select
                      name="category"
                      label=""
                      onChange={this.handleChange}
                      value={category}
                    >
                      <MenuItem value="Savings">Savings</MenuItem>
                      <MenuItem value="Checking">Checking</MenuItem>
                      <MenuItem value="Stock">Stock</MenuItem>
                      <MenuItem value="Misc">Miscellaneous</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    id="currentValue"
                    name="currentValue"
                    onChange={this.handleChange}
                    label={valuePlaceholder}
                    value={currentValue}
                  />
                  {quantityCondition}

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
  withRouter(AddAsset)
);

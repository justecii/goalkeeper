import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import Error from "../Error";
import { SIGNUP_USER } from "../../queries";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Auth.css";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Goalkeeper
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Signup extends React.Component {
  state = {
    ...initialState
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handlSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username ||
      !email ||
      !password ||
      !passwordConfirmation ||
      password !== passwordConfirmation;
    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Mutation
            mutation={SIGNUP_USER}
            variables={{ username, email, password }}
          >
            {(signupUser, { data, loading, error }) => {
              return (
                <form
                  className="form"
                  onSubmit={event => this.handlSubmit(event, signupUser)}
                >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="dense"
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="dense"
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="dense"
                    name="passwordConfirmation"
                    label="PasswordConfirmation"
                    type="password"
                    id="passwordConfirmation"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={this.handleChange}
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
              );
            }}
          </Mutation>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withRouter(Signup);

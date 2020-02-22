import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import Error from "../Error";
import { SIGNIN_USER } from "../../queries";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Auth.css";

const initialState = {
  username: "",
  password: ""
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

class Signin extends React.Component {
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
  handlSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
            {(signinUser, { data, loading, error }) => {
              return (
                <form
                  className="form"
                  onSubmit={event => this.handlSubmit(event, signinUser)}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={username}
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <Button
                    type="submit"
                    disabled={loading || this.validateForm()}
                    className="submit-button"
                    fullWidth
                  >
                    Sign In
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

export default withRouter(Signin);

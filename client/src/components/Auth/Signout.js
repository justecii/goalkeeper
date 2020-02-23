import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";

import { ApolloConsumer } from "react-apollo";

const handleSignout = (client, history) => {
  localStorage.setItem("token", "");
  client.resetStore();
  history.push("/");
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <Button onClick={() => handleSignout(client, history)}>Signout</Button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);

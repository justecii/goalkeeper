import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { Mutation } from "react-apollo";

import {
  DELETE_USER_ASSET,
  GET_CURRENT_USER,
  GET_USER_ASSETS
} from "../../queries";

class DeleteAsset extends React.Component {
  handleThis = event => {
    console.log(this.props);
  };
  handleDelete = deleteUserAsset => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (confirmDelete) {
      deleteUserAsset().then(({ data }) => {
        console.log(data);
        this.props.history.push(`/`);
      });
    }
  };
  render() {
    const user = this.props.user;
    return (
      <Mutation mutation={DELETE_USER_ASSET} variables={{ _id: this.props.id }}>
        {(deleteUserAsset, attrs = {}) => {
          return (
            <Button color="inherit">
              <DeleteForeverIcon
                color="inherit"
                className="red"
                onClick={() => this.handleDelete(deleteUserAsset)}
              />
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(DeleteAsset);

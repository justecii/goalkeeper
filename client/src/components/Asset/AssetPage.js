import React from "react";

import { withRouter } from "react-router-dom";
import withAuth from "../withAuth";
import DeleteAsset from "./DeleteAsset";

import { Query, Mutation } from "react-apollo";
import { GET_ASSET } from "../../queries";
import EditIcon from "@material-ui/icons/Edit";

class AssetPage extends React.Component {
  constructor(props) {
    super(props);

    // this.handleDelete = this.handleDelete.bind(this);
  }

  //   handleDelete(deleteUserGoal) {
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to delete this goal?"
  //     );
  //     if (confirmDelete) {
  //       deleteUserGoal().then(({ data }) => {
  //         console.log(data);
  //         this.props.history.push("/profile");
  //       });
  //     }
  //   }
  componentDidMount() {
    // this.setState({
    //   username: this.props.location.state.username
    // });
  }
  render() {
    const { _id } = this.props.match.params;
    return (
      <Query query={GET_ASSET} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);
          return (
            <div className="App">
              <div className="TODO">
                <h2>{data.getAsset.name}</h2>
                <p>Type: {data.getAsset.category}</p>
                <p>Value: {data.getAsset.currentValue}</p>
                {data.getAsset.interestRate !== 1 ? (
                  <p>Interest Rate: {data.getAsset.interestRate}</p>
                ) : null}
                {data.getAsset.quantity > 1 ? (
                  <p>Quantity: {data.getAsset.quantity}</p>
                ) : null}
              </div>
              <div className="TODO">
                Add Delete and edit functionality
                <DeleteAsset id={data.getAsset._id} user={_id} />
                <EditIcon color="primary" className="vertical-middle" />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AssetPage)
);

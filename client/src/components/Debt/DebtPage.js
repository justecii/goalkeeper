import React from "react";

import { withRouter } from "react-router-dom";
import withAuth from "../withAuth";

import { Query, Mutation } from "react-apollo";
import { GET_DEBT } from "../../queries";

class DebtPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { _id } = this.props.match.params;
    return (
      <Query query={GET_DEBT} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);
          return (
            <div className="App">
              <div className="TODO">
                <h2>{data.getDebt.name}</h2>
                <p>Type: {data.getDebt.category}</p>
                <p>Amount: {data.getDebt.currentDebt}</p>
                <p>Interest Rate: {data.getDebt.interestRate}</p>
                <p>Quantity: {data.getDebt.totalCreditLine}</p>
              </div>
              <div className="TODO">Add Delete and edit functionality</div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(DebtPage)
);

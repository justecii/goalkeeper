import React from "react";
import { Link } from "react-router-dom";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import { Query, Mutation } from "react-apollo";
import { GET_USER_ASSETS, GET_CURRENT_USER } from "../../queries";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

class UserAssets extends React.Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <Query query={GET_USER_ASSETS} variables={{ user }}>
        {/* CHeck these stupid curly braces below... need for what's being descructured  */}
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);
          let sumTotalAssets = 0;
          for (let j = 0; j < data.getUserAssets.length; j++) {
            sumTotalAssets +=
              data.getUserAssets[j].currentValue *
              data.getUserAssets[j].quantity;
          }

          return (
            <div>
              <h3 className="green header-icon">
                Assets{" "}
                <AttachMoneyIcon
                  className="vertical-bottom header-icon"
                  fontSize="inherit"
                />
              </h3>
              {!data.getUserAssets.length && (
                <p>
                  <strong>You have not added any assets yet</strong>
                </p>
              )}
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell>Interest</TableCell>
                      <TableCell>Qnt.</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.getUserAssets.map(assets => (
                      <TableRow key={assets._id}>
                        <TableCell>
                          <Link
                            to={{
                              pathname: `/asset/${assets._id}`,
                              state: { user: user }
                            }}
                          >
                            {assets.name}
                          </Link>
                        </TableCell>
                        <TableCell>{assets.category}</TableCell>
                        <TableCell>${assets.currentValue}</TableCell>
                        <TableCell>{assets.interestRate}%</TableCell>
                        <TableCell>{assets.quantity}</TableCell>
                        <TableCell>
                          ${assets.currentValue * assets.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <Link to="/asset/add" className="add-button">
                          ADD NEW
                        </Link>
                      </TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell>Total:</TableCell>
                      <TableCell>${sumTotalAssets}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default UserAssets;

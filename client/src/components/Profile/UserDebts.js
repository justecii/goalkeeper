import React from "react";
import { Link } from "react-router-dom";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";

import { Query, Mutation } from "react-apollo";
import { GET_USER_DEBTS, GET_CURRENT_USER } from "../../queries";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const handleDelete = deleteUserRecipe => {
  // hide for now
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this recipe?"
  //   );
  //   if (confirmDelete) {
  //     deleteUserRecipe().then(({ data }) => {
  //       console.log(data);
  //     });
  //   }
};

class UserDebts extends React.Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <Query query={GET_USER_DEBTS} variables={{ user }}>
        {/* CHeck these stupid curly braces below... need for what's being descructured  */}
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);
          let sumTotalDebts = 0;
          let sumTotalCreditLimit = 0;

          for (let i = 0; i < data.getUserDebts.length; i++) {
            sumTotalDebts += data.getUserDebts[i].currentDebt;
            sumTotalCreditLimit += data.getUserDebts[i].totalCreditLine;
          }
          let sumCreditPercent = Math.floor(
            sumTotalDebts / sumTotalCreditLimit * 100
          ).toFixed(1);
          return (
            <div>
              <h3 className="red ">
                Debts{" "}
                <MoneyOffIcon
                  className="vertical-bottom header-icon"
                  fontSize="inherit"
                />
              </h3>
              {!data.getUserDebts.length && (
                <p>
                  <strong>You have not added any debts yet</strong>
                </p>
              )}
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Account</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Available Credit</TableCell>
                      <TableCell>Interest</TableCell>
                      <TableCell>Credit Used (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.getUserDebts.map(debts => (
                      <TableRow key={debts._id}>
                        <TableCell>
                          <Link
                            to={{
                              pathname: `/debt/${debts._id}`,
                              state: { user: user }
                            }}
                          >
                            {debts.name}
                          </Link>
                        </TableCell>
                        <TableCell>{debts.category}</TableCell>
                        <TableCell align="left">${debts.currentDebt}</TableCell>
                        <TableCell align="center">
                          ${debts.totalCreditLine}
                        </TableCell>
                        <TableCell align="left">
                          {debts.interestRate}%
                        </TableCell>
                        <TableCell align="center">
                          {Math.floor(
                            debts.currentDebt / debts.totalCreditLine * 100
                          ).toFixed(1)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <Link to="/debt/add" className="add-button">
                          ADD NEW
                        </Link>
                      </TableCell>
                      <TableCell>Total:</TableCell>
                      <TableCell>${sumTotalDebts}</TableCell>
                      <TableCell align="center">
                        ${sumTotalCreditLimit}
                      </TableCell>
                      <TableCell colSpan={2} align="right">
                        {sumCreditPercent}%
                      </TableCell>
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

export default UserDebts;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAccount } from "../actions/accountActions";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  button: {
    margin: theme.spacing.unit,
    width: "40px",
    height: "40px"
  },
  table: {
    minWidth: 700
  }
});

class AccountList extends Component {
  remove(account) {
    return () => {
      this.props.remove(account);
    };
  }

  render() {
    const { classes, rates, accounts } = this.props;
    const accountList = accounts ? Object.values(accounts) : [];
    const now = Date.now();

    const columnHeaders = [
      "Account",
      "Last",
      "ETH Balance",
      "Token Balance",
      "Actions"
    ];

    const cellStyle = {
      padding: "4px 15px 4px 15px"
    };

    const accountsFormated = accountList.map(account => {
      const lastChecked = account.lastChecked
        ? Math.floor((now - new Date(account.lastChecked)) / 1000 / 60)
        : null;
      const tokenCount = account.balances
        ? Object.keys(account.balances).length - 1
        : 0;
      let tokenBalance = 0;
      if (account.balances)
        Object.keys(account.balances).forEach(token => {
          if (token !== "ETH" && rates[token] && rates[token].ETH) {
            tokenBalance += rates[token].ETH * account.balances[token];
          }
        });
      const ethBalance = account.balances ? account.balances.ETH : null;
      return {
        address: account.address,
        ethBalance: ethBalance ? ethBalance.toFixed(4) : null,
        lastChecked,
        tokenCount,
        tokenBalance: tokenBalance ? tokenBalance.toFixed(4) : null
      };
    });

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {columnHeaders.map((header, j) => (
                <TableCell key={j} style={cellStyle}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {accountsFormated.map((account, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{account.address}</TableCell>
                  <TableCell>{account.lastChecked} min</TableCell>
                  <TableCell>{account.ethBalance}</TableCell>
                  <TableCell>{account.tokenBalance}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.button}
                      aria-label="Delete"
                      onClick={this.remove.bind(this)(account.address)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

AccountList.propTypes = {
  accounts: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts,
  rates: state.rates
});

const mapDispatchToProps = dispatch => ({
  remove: account => dispatch(removeAccount(account))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AccountList));

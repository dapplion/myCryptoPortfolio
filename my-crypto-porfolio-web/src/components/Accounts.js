import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
// import PropTypes from 'prop-types'
// Components
import AccountList from "./AccountList";
import AddAccount from "./AddAccount";

import { connect } from "react-redux";

class Accounts extends Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="display2" color="textPrimary" gutterBottom>
          Accounts
        </Typography>
        <AddAccount />
        <AccountList />
      </React.Fragment>
    );
  }
}

AccountList.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);

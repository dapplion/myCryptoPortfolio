import { Component } from "react";
import PropTypes from "prop-types";
// Components
import { balanceAccount } from "../actions/accountActions";

import { connect } from "react-redux";

class Updater extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchBalance = this.fetchBalance.bind(this);
  }

  fetchBalance(account) {
    this.props.balanceAccount(account);
    // etherscan.getTokenBalances(account).then(() => {
    //   console.log('FINISHED')
    // })
  }

  render() {
    let accounts = this.props.accounts || {};

    // Verify balance is uptodate
    for (const account of Object.getOwnPropertyNames(accounts)) {
      if (Date.now() - accounts[account].lastChecked > 5 * 1000) {
        this.fetchBalance(account);
      }
    }

    return null;
  }
}

Updater.propTypes = {
  accounts: PropTypes.object.isRequired,
  balanceAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({
  balanceAccount: account => dispatch(balanceAccount(account))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Updater);

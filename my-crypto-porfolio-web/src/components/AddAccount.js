import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addAccount } from "../actions/accountActions";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Web3 from "web3";

const web3 = new Web3();

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  input: {
    minWidth: "350px"
  }
});
class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ""
    };
  }

  onChange(e) {
    this.setState({ account: e.target.value });
  }

  addAccount(e) {
    if (web3.utils.isAddress(this.state.account)) {
      this.props.addAccount(this.state.account);
      this.setState({ account: "" });
    } else {
      console.error("Wrong address");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="row">
        <div className="input-group">
          <Input
            placeholder="Paste an address"
            className={classes.input}
            onChange={this.onChange.bind(this)}
            value={this.state.account}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.addAccount.bind(this)}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

AddAccount.propTypes = {
  addAccount: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addAccount: account => dispatch(addAccount(account))
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(AddAccount));

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as targetsActions from "../actions/targetsActions";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper
} from "@material-ui/core";
import { getPortfolio } from "../selectors";
import CoolTable from "./CoolTable";

const cellHeight = "30px";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {},
  row: {
    height: cellHeight
  }
});

class Portfolio extends Component {
  onTargetChange(e, id) {
    const target = e.target.value;
    if (target >= 0 && target < 100) {
      this.props.updateTarget({ target, id });
    }
  }
  render() {
    const { classes, portfolio } = this.props;

    const columnHeaders = [
      "Currency",
      "Total",
      "Eth total",
      "Share",
      "Target",
      "Diff"
    ];
    const columnCoinProps = ["name", "total", "totalRef", "share"];
    const cellStyle = {
      padding: "4px 15px 4px 15px"
    };

    return (
      <React.Fragment>
        <Typography variant="display2" color="textPrimary" gutterBottom>
          Portfolio
        </Typography>

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
              {portfolio.map((coin, i) => {
                return (
                  <TableRow key={i} className={classes.row}>
                    <TableCell style={cellStyle}>{coin.name}</TableCell>
                    <TableCell style={cellStyle}>{coin.total}</TableCell>
                    <TableCell style={cellStyle}>{coin.totalRef}</TableCell>
                    <TableCell style={cellStyle}>{coin.share}</TableCell>
                    <TableCell style={{ ...cellStyle, padding: "0px 15px" }}>
                      <input
                        type="number"
                        style={{
                          border: "none",
                          height: cellHeight,
                          maxWidth: "60px",
                          fontFamily: "inherit",
                          fontSize: "inherit"
                        }}
                        onChange={e => {
                          this.onTargetChange(e, coin.name);
                        }}
                        value={coin.target}
                      />
                    </TableCell>
                    <TableCell style={{ ...cellStyle, color: coin.diffColor }}>
                      {coin.diff}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

Portfolio.propTypes = {
  portfolio: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  portfolio: getPortfolio(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(targetsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Portfolio));

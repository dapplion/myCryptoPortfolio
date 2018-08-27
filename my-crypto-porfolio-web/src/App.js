import React, { Component } from "react";
import { Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accounts from "./components/Accounts";
import Portfolio from "./components/Portfolio";
import Home from "./components/Home";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
// utils

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  layout: {
    marginTop: "25px",
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

const routes = [
  {
    name: "Accounts",
    path: "accounts",
    component: Accounts
  },
  {
    name: "Portfolio",
    path: "portfolio",
    component: Portfolio
  }
];

class App extends Component {
  render() {
    const routeItems = routes.map((route, i) => {
      return (
        <Route key={i} path={"/" + route.path} component={route.component} />
      );
    });

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Header routes={routes} />
        <main className={classes.layout}>
          <Route exact path={"/"} component={Home} />
          {routeItems}
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);

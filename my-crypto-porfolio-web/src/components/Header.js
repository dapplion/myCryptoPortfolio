import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UploadDownloadMonitor from "./UploadDownloadMonitor";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  }
});

class Header extends React.Component {
  render() {
    const { classes, routes } = this.props;
    return (
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            MyCrypto Portfolio
          </Typography>
          {routes.map((route, i) => (
            <Button
              key={i}
              component={Link}
              to={{ pathname: route.path, hash: window.location.hash }}
            >
              {route.name}
            </Button>
          ))}
          <UploadDownloadMonitor />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);

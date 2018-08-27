import React from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { withStyles } from "@material-ui/core/styles";
import PubSub from "pubsub-js";

console.log("SUBSCRIBED TO BLAH");
PubSub.subscribe("upload", (msg, data) => {
  console.log(msg, data);
});

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  }
});

let uploadToken, downloadToken, uploadInterval, downloadInterval;

class UploadDownloadMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      download: false,
      upload: false
    };
  }
  upload(msg, data) {
    clearInterval(uploadInterval);
    this.setState({ upload: true });
    uploadInterval = setInterval(() => {
      this.setState({ upload: false });
    }, 1000);
  }
  download(msg, data) {
    clearInterval(downloadInterval);
    this.setState({ download: true });
    downloadInterval = setInterval(() => {
      this.setState({ download: false });
    }, 1000);
  }
  componentDidMount() {
    uploadToken = PubSub.subscribe("UPLOAD", this.upload.bind(this));
    downloadToken = PubSub.subscribe("DOWNLOAD", this.download.bind(this));
  }
  componentWillUnmount() {
    PubSub.unsubscribe(uploadToken);
    PubSub.unsubscribe(downloadToken);
  }
  render() {
    const { classes, routes } = this.props;
    const def = "#c2c2c2";
    const green = "#04cc1f";
    const red = "#cc0404";
    return (
      <React.Fragment>
        <ArrowDownwardIcon
          style={{ color: this.state.download ? green : def }}
        />
        <ArrowUpwardIcon style={{ color: this.state.upload ? red : def }} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UploadDownloadMonitor);

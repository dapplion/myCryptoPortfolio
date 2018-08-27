import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as targetsActions from "../actions/targetsActions";
import Paper from "@material-ui/core/Paper";
import // State or Local Processing Plugins
"@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import { SortingState, IntegratedSorting } from "@devexpress/dx-react-grid";

function compareNumbers(a, b) {
  if (!a) a = -10000;
  if (!b) b = -10000;
  return a - b;
}
function compareStrings(a, b) {
  return a.localeCompare(b);
}
function compareFunctions(type) {
  switch (type) {
    case "numeric":
      return compareNumbers;
    case "string":
      return compareStrings;
    default:
      return compareNumbers;
  }
}

const HighlightedCell = props => {
  const value = props.value;
  let color = "inherit";
  if (value > 0) color = "green";
  if (value < 0) color = "red";
  return (
    <Table.Cell {...props}>
      <span style={{ color }}>{value}</span>
    </Table.Cell>
  );
};

const Cell = props => {
  const { column } = props;
  if (column.name === "diff") {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const columns = [
      { name: "name", title: "Name", type: "string" },
      { name: "total", title: "Total", type: "numeric" },
      { name: "totalRef", title: "Total Ref", type: "numeric" },
      { name: "share", title: "Share", type: "numeric" },
      { name: "target", title: "Target", type: "numeric" },
      { name: "diff", title: "Diff", type: "numeric" }
    ];
    const rows = this.props.portfolio;

    const integratedSortingColumnExtensions = columns.map(column => ({
      columnName: column.name,
      compare: compareFunctions(column.type)
    }));

    return (
      <Paper>
        <Grid rows={rows} columns={columns}>
          <SortingState
            defaultSorting={[{ columnName: "city", direction: "asc" }]}
          />
          <IntegratedSorting
            columnExtensions={integratedSortingColumnExtensions}
          />
          <Table cellComponent={Cell} />
          <TableHeaderRow showSortingControls />
        </Grid>
      </Paper>
    );
  }
}

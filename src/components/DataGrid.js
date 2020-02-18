import React from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


export default function DataGrid(props) {
  return (
    <TableContainer component={Paper}>
      <Grid
        rows={props.dataRows}
        columns={props.dataColumns}
      >
        <Table />
        <TableHeaderRow />
      </Grid>
    </TableContainer>
  );
}

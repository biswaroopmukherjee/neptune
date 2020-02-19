import React from 'react';
import {
  Grid, 
  Table,
  VirtualTable, 
  TableHeaderRow,
  TableColumnResizing,
  TableInlineCellEditing
} from '@devexpress/dx-react-grid-material-ui';
import { EditingState } from '@devexpress/dx-react-grid';

import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousClickedRow:{},
      previousHoverRow:{}
    };
  }

  highlightClickedRow(e){
    e.target.parentElement.bgColor='#21a8f3'
    this.state.previousClickedRow.bgColor='transparent'
    this.setState({previousClickedRow: e.target.parentElement})
  }
  highlightHoverRow(e){
    if (!e.target.parentElement.bgColor ||  (e.target.parentElement.bgColor =='transparent')) {
        e.target.parentElement.bgColor='grey'
        if(this.state.previousHoverRow.bgColor=='grey'){
        this.state.previousHoverRow.bgColor='transparent'}
        this.setState({previousHoverRow: e.target.parentElement})
      }
    
  }

  TableRow = ({ row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        onClick={(e) => { 
          this.props.setCurrentImage(row);
          this.highlightClickedRow(e)
         }}
         onMouseEnter={(e)=>{
          this.highlightHoverRow(e)
         }}
        style={{
          cursor: 'pointer',
        }}
      />
    );
  }

  commitChanges= ({ added, changed, deleted }) => {
    console.log(changed)
    let changedRows;
    if (changed) {
      changedRows = this.props.dataRows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      let rowId = Object.keys(changed)[0]
      this.props.editNotes({ ...this.props.dataRows[rowId], ...changed[rowId] })
      console.log(changed)
    }
    this.props.setRows(changedRows);
  }



  render() {
    
    return (
      <TableContainer component={Paper}>
        <Grid
          rows={this.props.dataRows}
          columns={this.props.dataColumns}
        >
          <EditingState
           onCommitChanges={this.commitChanges}
           columnExtensions={this.props.defaultColumnWidths} />
          <VirtualTable
            height={0.9 * window.innerHeight}
            rowComponent={this.TableRow}
          />
          <TableColumnResizing defaultColumnWidths={this.props.defaultColumnWidths} />
          <TableInlineCellEditing
            startEditAction='doubleClick'
            selectTextOnEditStart='true'
          />
          <TableHeaderRow />
        </Grid>
      </TableContainer>
    );
  }
}

export default DataGrid;

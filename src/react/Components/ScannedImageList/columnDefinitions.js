import React from "react";
import {GridColDef} from "@material-ui/data-grid";

const ColumnDefinitions: GridColDef[] = [
  {field: 'serialNumber', headerName: '序號', hide: true},
  {field: 'fileName',  headerName: 'FileName', width: 500},
];

function renderImageCell(){
  return (
    <div>Image Icon here</div>
  )
}

export default ColumnDefinitions
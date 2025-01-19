import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule, PaginationModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register required modules
ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);
const ReportTable = ({ rowData, columnDefs }) => {
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "400px",
        width: "100%",
        marginTop: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default ReportTable;

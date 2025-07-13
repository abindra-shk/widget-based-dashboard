import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import BaseWidget from "./BaseWidget";
import type { Widget } from "../../types";

interface TableWidgetProps {
  widget: Widget;
  baseProps: any;
}

const defaultTableData = {
  headers: ["Name", "Age", "City", "Country"],
  rows: [
    ["John Doe", 28, "New York", "USA"],
    ["Jane Smith", 34, "London", "UK"],
    ["Bob Johnson", 45, "Toronto", "Canada"],
    ["Alice Brown", 29, "Sydney", "Australia"],
  ],
};

const TableWidget: React.FC<TableWidgetProps> = ({ widget, baseProps }) => {
  const tableData = widget.config?.data || defaultTableData;
  const headers = tableData.headers || [];
  const rows = tableData.rows || [];
  console.log("table");
  return (
    <BaseWidget {...baseProps}>
      <TableContainer sx={{ height: "100%", overflow: "auto" }}>
        {headers.length > 0 && rows.length > 0 ? (
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {headers.map((header: string, index: number) => (
                  <TableCell key={index} sx={{ fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any[], rowIndex: number) => (
                <TableRow key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="textSecondary">
              No table data available.
            </Typography>
          </Box>
        )}
      </TableContainer>
    </BaseWidget>
  );
};

export default React.memo(TableWidget);

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Box
} from "@mui/material";

const columns = [
  { id: 'tourName', label: 'Tour Name', minWidth: 170 },
  { id: 'company', label: 'Company', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'destination', label: 'Destination', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'paymentDetails', label: 'Payment Details', minWidth: 170 },
];

function createData(tourName, company, date, destination, status, paymentDetails) {
  return { tourName, company, date, destination, status, paymentDetails };
}

const rows = [
  createData('Mountain Trek', 'Adventure Tours', '2023-05-15', 'Himalayas', 'Closed', '$500'),
  createData('Safari Adventure', 'Wildlife Expeditions', '2022-10-20', 'African Savanna', 'Completed', '$800'),
  createData('Island Getaway', 'Tropical Tours', '2024-02-28', 'Caribbean Islands', 'Ongoing', '$1200'),
  createData('Cultural Heritage', 'Historical Journeys', '2023-07-10', 'Europe', 'Open', '$600'),
];

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.tourName}
          </TableCell>
          <TableCell align="left">{row.company}</TableCell>
          <TableCell align="left">{row.date}</TableCell>
          <TableCell align="left">{row.destination}</TableCell>
          <TableCell align="left">{row.status}</TableCell>
          <TableCell align="left">{row.paymentDetails}</TableCell> {/* Move payment details to main table */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}> {/* Update colSpan */}
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Tour Details
                </Typography>
                {/* Add tour details here */}
                <Typography variant="body1" gutterBottom>
                  Day 1: Plan for Day 1
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Day 2: Plan for Day 2
                </Typography>
                {/* Add more day plans as needed */}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
function TouristHistoryTable() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ borderBottom: "2px solid", paddingBottom: 2 }}>
          Tour History
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left" // Aligning all headers to the left
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.tourName} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default TouristHistoryTable;

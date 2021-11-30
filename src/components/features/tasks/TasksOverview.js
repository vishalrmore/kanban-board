import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TasksOverview = ({ tasks }) => {
  const completed = tasks.filter((task) => task.stage === 3).length;
  const pending = tasks.length - completed;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Total Tasks</TableCell>
            <TableCell align="center">Completed Tasks</TableCell>
            <TableCell align="center">Pending Tasks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" align="center">
              {tasks.length}
            </TableCell>
            <TableCell align="center">{completed}</TableCell>
            <TableCell align="center">{pending}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksOverview;

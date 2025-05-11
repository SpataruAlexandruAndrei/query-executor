import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

const ChatMessage = ({ headers, results }) => {
  if (results.length === 0) {
    return <Typography>No results found.</Typography>;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 800, margin: "auto", mt: 4 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} sx={{ fontWeight: "bold" }}>
                {header
                  .split("_")
                  .map((word) => word.toUpperCase())
                  .join(" ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((user) => (
            <TableRow key={user.user_id}>
              {headers.map((header, index) => (
                <TableCell key={index}>{user[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChatMessage;

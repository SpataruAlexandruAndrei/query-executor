import React from "react";
import { ListItem, Paper, Typography } from "@mui/material";

const UserMessage = ({ text }) => {
  return (
    <Typography component="div">
      {text.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < text.split("\n").length - 1 && <br />}
        </React.Fragment>
      ))}
    </Typography>
  );
};

export default UserMessage;

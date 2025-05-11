import React from "react";
import { ListItem, Paper, Typography } from "@mui/material";
import UserMessage from "./UserMessage";
import ChatMessage from "./ChatMessage";

const ChatContent = ({ message }) => {
  const { user, text, results, headers } = message;

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ flexDirection: user ? "row-reverse" : "row" }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: "80%",
          backgroundColor: user ? "#e3f2fd" : "#f5f5f5",
          borderRadius: 2,
        }}
      >
        {user ? (
          <UserMessage text={text} />
        ) : (
          <ChatMessage headers={headers} results={results} />
        )}
      </Paper>
    </ListItem>
  );
};

export default ChatContent;

import React, { useEffect, useRef } from "react";
import { Paper, List, Divider, Box, Typography } from "@mui/material";
import ChatContent from "./ChatContent";

const ChatMessages = ({ chatHistory }) => {
  const dummyRef = useRef(null);

  const scrollToBottom = () => {
    dummyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <Paper
      maxWidth="md"
      elevation={3}
      sx={{
        flexGrow: 1,
        mb: 2,
        p: 2,
        overflow: "auto",
        maxHeight: "calc(100vh - 180px)",
      }}
    >
      <List>
        {chatHistory.length === 0 ? (
          <EmptyChat />
        ) : (
          chatHistory.map((msg, index) => (
            <React.Fragment key={index}>
              <ChatContent message={msg} />
              {index < chatHistory.length - 1 && (
                <Divider variant="middle" sx={{ my: 1 }} />
              )}
            </React.Fragment>
          ))
        )}
      </List>
      <div ref={dummyRef} />
    </Paper>
  );
};

const EmptyChat = () => (
  <Box sx={{ textAlign: "center", py: 4 }}>
    <Typography color="textSecondary">
      Start by typing a database query in natural language.
    </Typography>
    <Typography color="textSecondary" sx={{ mt: 2 }}>
      Examples:
    </Typography>
    <Typography color="textSecondary" variant="body2">
      "Show me all active users"
    </Typography>
    <Typography color="textSecondary" variant="body2">
      "List users created before 2023"
    </Typography>
    <Typography color="textSecondary" variant="body2">
      "What's the email of John Doe?"
    </Typography>
  </Box>
);

export default ChatMessages;

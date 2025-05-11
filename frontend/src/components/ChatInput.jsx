import React from "react";
import { Paper, Box, TextField, Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({
  message,
  loading,
  handleMessageChange,
  handleSendMessage,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Type your database query in natural language..."
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          variant="outlined"
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon />
            )
          }
          onClick={handleSendMessage}
          disabled={loading || !message.trim()}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatInput;

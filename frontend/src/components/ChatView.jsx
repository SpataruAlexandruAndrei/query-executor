import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { sendQuery } from "../../services/api";

const ChatView = ({ initialMessage = "" }) => {
  const [message, setMessage] = useState(initialMessage);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      handleSendMessage();
    }
  }, [initialMessage]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { user: true, text: message, results: [], headers: [] };
    setChatHistory((prev) => [...prev, userMessage]);

    setMessage("");
    setLoading(true);

    try {
      const data = await sendQuery(message);

      if (data.success) {
        const systemMessage = {
          user: false,
          results: data.results,
          headers: Object.keys(data.results[0]),
          text: "",
        };
        setChatHistory((prev) => [...prev, systemMessage]);
      } else {
        const errorMessage = {
          user: false,
          text: `Error: ${data.error}`,
          headers: [],
          results: [],
        };
        setChatHistory((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending query:", error);
      const errorMessage = {
        user: false,
        results: [],
        headers: [],
        text: "Error connecting to server. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <ChatMessages chatHistory={chatHistory} />
      <ChatInput
        message={message}
        loading={loading}
        handleMessageChange={handleMessageChange}
        handleSendMessage={handleSendMessage}
      />
    </Container>
  );
};
export default ChatView;

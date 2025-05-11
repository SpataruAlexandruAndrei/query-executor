import React, { useState, useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import HistoryItem from "./HistoryItem";
import { fetchQueryHistory } from "../../services/api";

const HistoryView = ({ onReuseQuery }) => {
  const [queryHistory, setQueryHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await fetchQueryHistory();
        if (data.success) {
          setQueryHistory(data.history || []);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    getHistory();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
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
        {queryHistory.length === 0 ? (
          <Typography color="textSecondary" sx={{ textAlign: "center", py: 4 }}>
            No query history found.
          </Typography>
        ) : (
          queryHistory.map((item, index) => (
            <HistoryItem key={index} item={item} onReuseQuery={onReuseQuery} />
          ))
        )}
      </Paper>
    </Container>
  );
};

export default HistoryView;

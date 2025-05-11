import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { formatTimestamp } from "../../services/api";

const HistoryItem = ({ item, onReuseQuery }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">
          {formatTimestamp(item.timestamp)}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
          Query: {item.query}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Results:</Typography>
          {Array.isArray(item.results) && item.results.length > 0 ? (
            <Box
              component="pre"
              sx={{
                overflow: "auto",
                bgcolor: "#f5f5f5",
                p: 1,
                borderRadius: 1,
                fontSize: "0.875rem",
              }}
            >
              {JSON.stringify(item.results, null, 2)}
            </Box>
          ) : (
            <Typography variant="body2">No results</Typography>
          )}
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => onReuseQuery(item.query)}
        >
          Reuse Query
        </Button>
      </CardContent>
    </Card>
  );
};

export default HistoryItem;

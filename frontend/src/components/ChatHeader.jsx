import React from "react";
import { Box, AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HistoryIcon from "@mui/icons-material/History";
import StorageIcon from "@mui/icons-material/Storage";

const ChatHeader = ({ activeTab, handleTabChange }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <StorageIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Query Executor - {activeTab === 0 ? "Chat" : "History"}
        </Typography>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab icon={<SendIcon />} label="CHAT" />
          <Tab icon={<HistoryIcon />} label="HISTORY" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;

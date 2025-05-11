import { useState } from "react";
import { Box } from "@mui/material";
import ChatHeader from "./components/ChatHeader";
import ChatView from "./components/ChatView";
import HistoryView from "./components/HistoryView";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [message, setMessage] = useState("");

  const handleTabChange = (event, newValue) => {
    console.log(event);
    setActiveTab(newValue);
  };

  const handleReuseQuery = (query) => {
    setMessage(query);
    setActiveTab(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ChatHeader activeTab={activeTab} handleTabChange={handleTabChange} />

      <Box sx={{ flexGrow: 1, overflow: "hidden", p: 2 }}>
        {activeTab === 0 ? (
          <ChatView initialMessage={message} />
        ) : (
          <HistoryView onReuseQuery={handleReuseQuery} />
        )}
      </Box>
    </Box>
  );
}

export default App;

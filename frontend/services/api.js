export const sendQuery = async (message) => {
  try {
    const response = await fetch("http://localhost:3000/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error sending query:", error);
    throw error;
  }
};

export const fetchQueryHistory = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/history");
    return await response.json();
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

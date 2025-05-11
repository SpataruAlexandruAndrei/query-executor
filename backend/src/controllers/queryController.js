const logger = require("../utils/logger");
const ragService = require("../services/ragService");
const n8nService = require("../services/n8nService");
const path = require("path");
const fs = require("fs").promises;

exports.processQuery = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    logger.info(`Processing user query: ${message}`);
    const queryIntent = await ragService.analyzeQuery(message);

    const result = await n8nService.executeWorkflow(queryIntent);

    await storeQueryResults(message, result);

    return res.status(200).json({
      success: true,
      query: message,
      results: result,
    });
  } catch (error) {
    logger.error(`Error processing query: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: "Failed to process query",
      details: error.message,
    });
  }
};

exports.getQueryHistory = async (req, res) => {
  try {
    const historyFilePath = path.join(
      __dirname,
      "../../data/query_history.json"
    );

    try {
      const historyData = await fs.readFile(historyFilePath, "utf8");
      const history = JSON.parse(historyData);
      return res.status(200).json({ success: true, history });
    } catch (err) {
      if (err.code === "ENOENT") {
        return res.status(200).json({ success: true, history: [] });
      }
      throw err;
    }
  } catch (error) {
    logger.error(`Error retrieving query history: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve query history",
    });
  }
};

async function storeQueryResults(query, results) {
  try {
    const historyFilePath = path.join(
      __dirname,
      "../../data/query_history.json"
    );
    const timestamp = new Date().toISOString();

    let history = [];

    try {
      const historyData = await fs.readFile(historyFilePath, "utf8");
      history = JSON.parse(historyData);
    } catch (err) {
      if (err.code === "ENOENT") {
        await fs.mkdir(path.dirname(historyFilePath), { recursive: true });
      } else {
        throw err;
      }
    }

    history.push({
      timestamp,
      query,
      results,
    });

    await fs.writeFile(historyFilePath, JSON.stringify(history, null, 2));
    logger.info(`Query results stored in history file`);
  } catch (error) {
    logger.error(`Error storing query results: ${error.message}`);
  }
}

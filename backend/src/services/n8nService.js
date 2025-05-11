const axios = require("axios");
const logger = require("../utils/logger");
const config = require("../config/config");
const databaseService = require("./dbService");

exports.executeWorkflow = async (queryData) => {
  try {
    logger.info(`Executing n8n workflow for query: ${queryData.originalQuery}`);

    if (config.useN8nApi) {
      return await executeViaApi(queryData);
    }

    return await executeDirectly(queryData);
  } catch (error) {
    logger.error(`Error executing n8n workflow: ${error.message}`);
    throw new Error(`Failed to execute workflow: ${error.message}`);
  }
};

async function executeViaApi(queryData) {
  try {
    const payload = {
      workflowData: {
        query: queryData.sqlQuery,
        originalQuery: queryData.originalQuery,
      },
    };

    const response = await axios.post(
      `${config.n8n.baseUrl}/webhook/query-executor-workflow`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-N8N-API-KEY": config.n8n.apiKey,
        },
      }
    );

    if (response.data.length) {
      const results = response.data;
      logger.info(
        `n8n workflow executed successfully with ${
          results?.length || 0
        } results`
      );
      return formatResults(results);
    } else {
      logger.warn("n8n returned unexpected response format");
      return [];
    }
  } catch (error) {
    logger.error(`Error calling n8n API: ${error.message}`);
    throw error;
  }
}

async function executeDirectly(queryData) {
  try {
    const results = await databaseService.executeQuery(queryData.sqlQuery);

    await databaseService.logQueryToAudit(
      queryData.originalQuery,
      queryData.sqlQuery
    );

    return results;
  } catch (error) {
    logger.error(`Error executing direct database query: ${error.message}`);
    throw error;
  }
}

function formatResults(results) {
  if (!results || !Array.isArray(results)) {
    return [];
  }

  return results.map((row) => {
    if (row.created_at) {
    }
    return row;
  });
}

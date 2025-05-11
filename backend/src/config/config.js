require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || "development",
    apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api",
  },

  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    name: process.env.DB_NAME || "query_executor_db",
  },

  n8n: {
    baseUrl: process.env.N8N_BASE_URL || "http://localhost:5678",
    apiKey: process.env.N8N_API_KEY,
    workflowId: process.env.N8N_WORKFLOW_ID,
  },

  llm: {
    provider: process.env.LLM_PROVIDER || "openai",
    apiKey: process.env.LLM_API_KEY,
    model: process.env.LLM_MODEL || "gpt-4o-mini",
  },

  useN8nApi: process.env.USE_N8N_API === "true",
  logQueriesToAudit: process.env.LOG_QUERIES_TO_AUDIT === "true",
  storeResultsAsJson: process.env.STORE_RESULTS_AS_JSON === "true",
};

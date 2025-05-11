const { ChatOpenAI } = require("langchain/chat_models/openai");
const logger = require("../utils/logger");
const config = require("../config/config");

const llm = new ChatOpenAI({
  modelName: config.llm.model,
  temperature: 0,
  openAIApiKey: config.llm.apiKey,
});

exports.analyzeQuery = async (userQuery) => {
  try {
    logger.info("Analyzing user query with RAG");

    const systemPrompt = `
    You are a helpful assistant that translates natural language queries into SQL queries.
    The database has tables including 'users' with fields like user_id, full_name, email, created_at, status.
    
    Rules:
    1. For time-related queries, format created_at into YYYY-MM-DD HH:MM:SS format
    2. Always return all fields unless otherwise specified
    3. Never expose password fields or sensitive information
    4. If the query is about "active users", add WHERE status = 'active' to the SQL
    5. Return the SQL query only, without any explanations
    6. Never delete data from tables
    
    Examples:
    - "Show me all users" -> "SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%S') as created_at FROM users"
    - "Show me all active users" -> "SELECT user_id, full_name, email, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%S') as created_at FROM users WHERE status = 'active'"
    - "Show me full name for all users" -> "SELECT full_name FROM users"
    `;

    const template = `
    ${systemPrompt}
    
    User query: ${userQuery}
    
    SQL:
    `;

    const response = await llm.call([template]);
    const sqlQuery = response.content.trim();

    logger.info(`Generated SQL query: ${sqlQuery}`);

    return {
      originalQuery: userQuery,
      sqlQuery: sqlQuery,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logger.error(`Error in RAG query analysis: ${error.message}`);
    throw new Error(`Failed to analyze query: ${error.message}`);
  }
};

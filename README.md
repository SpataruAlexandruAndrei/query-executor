# Query Executor

This project creates a natural language interface to query a database using RAG (Retrieval-Augmented Generation) techniques, with n8n handling the workflow automation.

## Architecture

- **Frontend**: React.js chat interface
- **Backend**: Node.js with Express
- **Workflow Automation**: n8n
- **Database**: MySql

## Features

- Natural language query processing
- SQL generation from natural language
- Dynamic data retrieval from a local database
- Timestamp formatting as per requirements
- Data presentation in a readable format
- Query logging in audit table
- Results storage in JSON files

## Setup Instructions

### 1. Backend Setup

```bash
# Clone this repository
git clone [repo-url]
cd ../backend

# Install dependencies
npm install

# Start the backend server
npm run dev
```

The server will run on http://localhost:3000

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at http://localhost:5173

### 3. n8n Setup

```bash
# Install n8n globally
npm install n8n -g

# Start n8n
n8n
```

1. Access n8n at http://localhost:5678
2. Import the workflow JSON file provided in this repository
3. Activate the workflow
4. Update the webhook URL in the backend if necessary


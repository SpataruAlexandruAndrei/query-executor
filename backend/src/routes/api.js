const express = require("express");
const queryController = require("../controllers/queryController");
const dbService = require("../services/dbService");

const router = express.Router();

router.post("/query", queryController.processQuery);

router.post("/db", dbService.initializeDatabase);

router.get("/history", queryController.getQueryHistory);

module.exports = router;

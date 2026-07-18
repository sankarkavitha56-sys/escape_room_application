const express = require("express");
const router = express.Router();
const { completeChallenge } = require("../controllers/challengeController");

router.post("/", completeChallenge);

module.exports = router;

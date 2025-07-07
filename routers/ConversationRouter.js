const express = require("express");
const ConversationController = require("../controllers/ConversationController");

const ConversationRouter = express.Router();

ConversationRouter.post(
  "/start-conversation",
  ConversationController.startConversation
);

ConversationRouter.post("/send-message", ConversationController.sendMessage);

module.exports = ConversationRouter;

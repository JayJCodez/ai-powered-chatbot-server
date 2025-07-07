const express = require("express");
const ConversationRouter = require("./ConversationRouter");

const ApiRouter = express.Router();

ApiRouter.use("/conversations", ConversationRouter);

module.exports = ApiRouter;

const ConversationRepository = require("../models/ConversationRepository");
const UserRepository = require("../models/UserRepository");
const sendAISTudioPrompt = require("../utils/promptAIStudio");

const ConversationController = {
  startConversation: async (req, res) => {
    const { name, userId } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Missing required field: userId",
      });
    }

    try {
      let user = null;

      if (!userId) {
        user = await UserRepository.createUser({
          name: name,
        });

        if (!user) {
          return res.status(500).json({
            error: "An error occurred while creating the user",
          });
        }
      } else {
        user = await UserRepository.findUserById(userId);

        if (!user) {
          return res.status(404).json({
            error: "User not found",
          });
        }
      }

      const conversation = await ConversationRepository.createConversation(
        user.id,
        `Conversation with ${user.name}`
      );

      if (!conversation) {
        return res.status(500).json({
          error: "An error occurred while creating the conversation",
        });
      }

      const botMessage = await ConversationRepository.addMessage({
        conversation_id: conversation.id,
        type: "Bot",
        content: `What is your name?`,
      });

      conversation.addMessage(botMessage);

      //   const userMessage = await ConversationRepository.addMessage({
      //     conversation_id: conversation.id,
      //     type: "User",
      //     content: name,
      //   });

      //   conversation.addMessage(userMessage);

      return res.status(200).json({
        message: "Conversation started successfully",
        user: user.toJSON(),
        conversation: conversation.toJSON(),
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
      return res.status(500).json({
        error: "An error occurred while starting the conversation",
      });
    }
  },
  sendMessage: async (req, res) => {
    const { conversationId, message } = req.body;

    if (!conversationId || !message || !message.content) {
      return res.status(400).json({
        error: "Missing required fields: conversationId or message content",
      });
    }

    try {
      const newMessage = await ConversationRepository.addMessage({
        conversation_id: conversationId,
        content: message.content,
        type: message.type || "User",
      });

      // Generate a bot reply based on the user's message

      if (!newMessage) {
        return res.status(500).json({
          error: "An error occurred while sending the message",
        });
      }

      const botMessageContent = await sendAISTudioPrompt(
        `You are a helpful assistant. Respond to the user's message: "${message.content}"`
      );

      const botReply = await ConversationRepository.addMessage({
        conversation_id: conversationId,
        content: botMessageContent || "Sorry, I didn't understand that.",
        type: "Bot",
      });

      console.log(newMessage, botReply);

      if (!newMessage) {
        return res.status(500).json({
          error: "An error occurred while sending the message",
        });
      }

      return res.status(200).json({
        message: "Message sent successfully",
        messages: {
          userMessage: newMessage,
          botMessage: botReply,
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({
        error: "An error occurred while sending the message",
      });
    }
  },
};

module.exports = ConversationController;

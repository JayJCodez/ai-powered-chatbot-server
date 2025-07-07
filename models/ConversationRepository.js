const pool = require("../database");
const Conversation = require("./Conversation");

class ConversationRepository {
  constructor() {
    this.pool = pool;
  }

  async createConversation(userId, title) {
    if (!userId || !title) {
      throw new Error(`Missing required fields: User ID, message`);
    }

    try {
      const createConversationQuery = `INSERT INTO conversations (title, user_id) VALUES ($1, $2) RETURNING id, title, user_id;`;

      const { rowCount, rows } = await this.pool.query(
        createConversationQuery,
        [title, userId]
      );

      if (rowCount === 0) {
        throw new Error(`Failed to create new user at this time`);
      }

      return new Conversation(rows[0].id, rows[0].user_id, rows[0].title);
    } catch (error) {
      console.log(
        `An error occured while attempting to create new conversation`
      );

      throw error;
    }
  }

  async addMessage(message) {
    try {
      // Validate required fields
      if (!message.conversation_id || !message.content || !message.type) {
        throw new Error(
          "Missing required fields: conversation_id, content, or type"
        );
      }

      const insertMessageQuery = `INSERT INTO messages (conversation_id, content, type) VALUES ($1, $2, $3) RETURNING id, conversation_id, content, created_at, type    ;`;

      const { rowCount, rows } = await this.pool.query(insertMessageQuery, [
        message.conversation_id,
        message.content,
        message.type,
      ]);

      if (rowCount === 0) {
        throw new Error("Failed to insert new message");
      }

      return rows[0];
    } catch (error) {
      console.log(
        `An error occured while attempting to insert new message`,
        error
      );
      throw error;
    }
  }

  async getConversationById(conversationId) {
    if (!conversationId) {
      throw new Error("Conversation ID is required");
    }

    try {
      const getConversationQuery = `SELECT c.*, m.*, m.id AS message_id, m.created_at AS message_created_at FROM conversations c
      LEFT JOIN messages m ON m.conversation_id = c.id
      WHERE c.id = $1;`;

      const { rowCount, rows } = await this.pool.query(getConversationQuery, [
        conversationId,
      ]);

      if (rowCount === 0) {
        return null;
      } else {
        const conversation = rows[0];

        return new Conversation(
          conversation.id,
          conversation.user_id,
          conversation.title,
          rows.map((row) => {
            return {
              id: row.message_id,
              conversation_id: row.conversation_id,
              message: row.message,
              type: row.type,
              created_at: row.message_created_at,
            };
          }),
          conversation.created_at
        );
      }
    } catch (error) {
      console.error(
        `An error occured while attempting to retrieve conversation by Id`,
        error
      );

      throw error;
    }
  }
}

module.exports = new ConversationRepository();

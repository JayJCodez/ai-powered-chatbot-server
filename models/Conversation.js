class Conversation {
  constructor(id, userId, title, messages = [], createdAt = new Date()) {
    this.id = id;
    this.createdAt = createdAt;
    this.messages = messages;
    this.userId = userId;
    this.title = title;
  }

  addMessage(message) {
    this.messages.push({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt || new Date(),
    });
  }

  static fromJSON(data) {
    const conversation = new Conversation(
      data.id,
      data.userId,
      data.title,
      new Date(data.createdAt)
    );

    conversation.messages = data.messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      createdAt: new Date(msg.createdAt),
    }));
    return conversation;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      messages: this.messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt.toISOString(),
      })),
      createdAt: this.createdAt.toISOString(),
    };
  }
}

module.exports = Conversation;

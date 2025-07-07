class User {
  constructor(id, name, created_at = new Date()) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
  }

  static fromJSON(user) {
    new User(user.id, user.name, user.created_at);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
    };
  }
}

module.exports = User;

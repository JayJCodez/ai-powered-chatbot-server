const pool = require("../database");
const User = require("./User");

class UserRepository {
  constructor() {
    this.pool = pool;
  }

  async createUser(user) {
    if (!user.name) {
      throw new Error("Missing required field: Name");
    }

    try {
      const createUserQuery = `INSERT INTO users (name) VALUES ($1) RETURNING id, name, created_at;`;

      const { rowCount, rows } = await this.pool.query(createUserQuery, [
        user.name,
      ]);

      if (rowCount === 0) {
        return null; // No user created
      }

      return new User(rows[0].id, rows[0].name, rows[0].created_at);
    } catch (error) {
      console.error(
        `An error occurred while attempting to create a new user:`,
        error
      );
      throw error; // Throw error for higher-level handling
    }
  }

  async findUserById(userId) {
    if (!userId) {
      throw new Error(`Missing required field: userId`);
    }

    try {
      const findUserQuery = `SELECT id, name, created_at FROM users WHERE is = $1`;

      const { rows, rowCount } = await this.pool.query(findUserQuery, [userId]);

      if (rowCount === 0) {
        return null;
      }

      return new User(rows[0].id, rows[0].name, rows[0].created_at);
    } catch (error) {
      console.log(`An error occured while attempting to retreive user:`, error);
      throw error;
    }
  }
}

module.exports = new UserRepository();

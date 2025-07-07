# ChatBot Server Express

A Node.js Express server for a chatbot application with PostgreSQL database integration.

## Features

- 🤖 Real-time chatbot conversations
- 👤 User account management
- 💬 Message history storage
- 🔄 RESTful API endpoints
- 🗄️ PostgreSQL database with UUID support
- 🛡️ CORS enabled for cross-origin requests

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Native pg driver
- **Authentication**: Basic user management
- **API**: RESTful endpoints

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ChatBotServer-Express
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```env
DATABASE_URL=postgres://username:password@localhost:5432/your_database
AISTUDIO_API_KEY=your_api_key_here
```

4. Set up the database:

```bash
psql -U your_username -d your_database -f database_backup.sql
```

5. Start the server:

```bash
npm start
```

The server will be running at `http://localhost:5100`

## API Endpoints

### Conversations

- `POST /api/conversations/start-conversation` - Start a new conversation
- `POST /api/conversations/send-message` - Send a message to a conversation
- `GET /api/conversations/:id` - Get conversation by ID

### Users

- `POST /api/users/create` - Create a new user
- `GET /api/users/:id` - Get user by ID

## Database Schema

The application uses PostgreSQL with the following main tables:

- `users` - User account information
- `conversations` - Chat conversation records
- `messages` - Individual messages within conversations

## Frontend

The frontend application can be found at: [Frontend Repository Link](https://github.com/JayJCodez/ai-powered-chatbot)

## Project Structure

```
ChatBotServer-Express/
├── controllers/           # Request handlers
│   ├── ConversationController.js
│   └── UserController.js
├── models/               # Data models and repositories
│   ├── Conversation.js
│   ├── ConversationRepository.js
│   ├── User.js
│   └── UserRepository.js
├── routers/              # API route definitions
│   ├── index.js
│   └── ConversationRouter.js
├── utils/                # Utility functions
│   └── promptAIStudio.js
├── database.js           # Database connection
├── database_backup.sql   # Database schema
├── server.js            # Application entry point
└── package.json         # Dependencies and scripts
```

## Environment Variables

| Variable           | Description                             | Required |
| ------------------ | --------------------------------------- | -------- |
| `DATABASE_URL`     | PostgreSQL connection string            | Yes      |
| `AISTUDIO_API_KEY` | AI Studio API key for chatbot responses | Yes      |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Acknowledgments

- Express.js team for the excellent web framework
- PostgreSQL community for the robust database system
- Node.js community for the runtime environment

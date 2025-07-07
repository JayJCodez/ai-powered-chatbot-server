# Contributing to ChatBot Server Express

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/ChatBotServer-Express.git
   cd ChatBotServer-Express
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up your development environment** following the README instructions

## Development Workflow

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly

4. **Commit your changes** with a clear commit message:
   ```bash
   git commit -m "Add: new feature description"
   # or
   git commit -m "Fix: bug description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Coding Standards

### JavaScript Style
- Use modern ES6+ syntax
- Follow consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic

### File Structure
- Follow the existing project structure
- Place controllers in `controllers/`
- Place models in `models/`
- Place routes in `routers/`
- Place utilities in `utils/`

### Database
- Use parameterized queries for SQL injection protection
- Follow the repository pattern for data access
- Include proper error handling

### Error Handling
- Use try-catch blocks for async operations
- Throw descriptive errors
- Log errors with context

## Code Review Process

1. All contributions must be made via Pull Requests
2. At least one maintainer must review and approve changes
3. All tests must pass (when implemented)
4. Code must follow the established patterns

## Reporting Issues

When reporting issues, please include:
- **Description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Environment details** (Node.js version, OS, etc.)

## Feature Requests

We welcome feature requests! Please:
- Check if the feature already exists or is planned
- Provide a clear description of the feature
- Explain why it would be useful
- Consider offering to implement it yourself

## Areas for Contribution

We especially welcome contributions in these areas:
- **Tests**: Unit tests, integration tests
- **Documentation**: API documentation, code comments
- **Performance**: Optimization and caching
- **Security**: Security improvements and audits
- **Features**: New chatbot capabilities
- **Bug fixes**: Any reported issues

## Development Setup

### Database Setup
```bash
# Create development database
createdb chatbot_development

# Run schema
psql -U username -d chatbot_development -f database_backup.sql
```

### Environment Variables
```bash
cp .env.example .env
# Update with your development values
```

### Running the Server
```bash
npm run dev  # Uses nodemon for auto-restart
```

## Testing Guidelines

- Write tests for new features
- Ensure existing tests still pass
- Test both success and error cases
- Use meaningful test descriptions

## Documentation

- Update README.md for new features
- Add API documentation for new endpoints
- Include code comments for complex logic
- Update CHANGELOG.md for significant changes

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Reach out to the maintainers
- Check existing issues and pull requests

Thank you for contributing! 🎉

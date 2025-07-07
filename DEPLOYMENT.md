# Deployment Guide

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- PM2 (for production process management)

## Environment Setup

1. **Production Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with production values:
   ```env
   DATABASE_URL=postgres://username:password@your-db-host:5432/production_db
   AISTUDIO_API_KEY=your_production_api_key
   NODE_ENV=production
   PORT=5100
   ```

## Database Setup

1. **Create Production Database**
   ```bash
   createdb chatbot_production
   ```

2. **Run Database Schema**
   ```bash
   psql -U username -d chatbot_production -f database_backup.sql
   ```

## Deployment Options

### Option 1: Traditional Server Deployment

1. **Install Dependencies**
   ```bash
   npm ci --production
   ```

2. **Install PM2 Globally**
   ```bash
   npm install -g pm2
   ```

3. **Start Application with PM2**
   ```bash
   pm2 start server.js --name "chatbot-server"
   pm2 startup
   pm2 save
   ```

4. **Monitor Application**
   ```bash
   pm2 status
   pm2 logs chatbot-server
   ```

### Option 2: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --production
   
   COPY . .
   
   EXPOSE 5100
   
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t chatbot-server .
   docker run -d -p 5100:5100 --env-file .env chatbot-server
   ```

### Option 3: Cloud Platform Deployment

#### Heroku
1. **Install Heroku CLI**
2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set DATABASE_URL=your_database_url
   heroku config:set AISTUDIO_API_KEY=your_api_key
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

#### Railway/Render
- Connect your GitHub repository
- Set environment variables in the platform dashboard
- Deploy automatically on push

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use secure values for production
   - Rotate API keys regularly

2. **Database Security**
   - Use connection pooling
   - Enable SSL connections
   - Restrict database access by IP

3. **CORS Configuration**
   - Update CORS origins for production domains
   - Remove wildcard (`*`) origins

4. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

## Monitoring

1. **Health Check Endpoint**
   Add to your server:
   ```javascript
   app.get('/health', (req, res) => {
     res.status(200).json({ status: 'OK', timestamp: new Date() });
   });
   ```

2. **Logging**
   - Use structured logging (Winston, Pino)
   - Log to files and external services
   - Monitor error rates

## Backup Strategy

1. **Database Backups**
   ```bash
   pg_dump -U username chatbot_production > backup_$(date +%Y%m%d).sql
   ```

2. **Automated Backups**
   - Set up cron jobs for regular backups
   - Store backups in cloud storage
   - Test restore procedures regularly

## Load Balancing

For high traffic applications:
1. **Nginx Configuration**
2. **Multiple Server Instances**
3. **Database Connection Pooling**
4. **CDN for Static Assets**

## Maintenance

1. **Regular Updates**
   ```bash
   npm audit
   npm update
   ```

2. **Database Maintenance**
   - Monitor query performance
   - Update statistics
   - Vacuum tables regularly

3. **Log Rotation**
   - Implement log rotation
   - Monitor disk space
   - Archive old logs

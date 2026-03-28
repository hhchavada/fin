# Fin Backend - Node.js + Express + TypeScript + MongoDB

A boilerplate setup for building scalable backend applications with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict mode
- **Express**: Fast, unopinionated web framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **Environment Configuration**: Secure environment variable management
- **Security**: Helmet, CORS, and other security middleware
- **Logging**: Morgan for HTTP request logging
- **Error Handling**: Global error handling middleware
- **Code Quality**: ESLint with TypeScript rules
- **Development Tools**: Hot reload with ts-node-dev

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fin-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env` file:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fin-db
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── config/
│   ├── database.ts    # MongoDB connection configuration
│   └── env.ts         # Environment variables configuration
├── types/
│   └── index.ts       # TypeScript type definitions
└── index.ts           # Express server entry point
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run clean` - Clean build directory

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/fin-db |
| `JWT_SECRET` | JWT secret key | your-super-secret-jwt-key |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `CORS_ORIGIN` | CORS allowed origin | http://localhost:3000 |

## 📊 API Endpoints

- `GET /health` - Health check endpoint

## 🔒 Security Features

- **Helmet**: Sets various HTTP headers to secure the app
- **CORS**: Cross-Origin Resource Sharing configuration
- **Rate Limiting**: Can be easily implemented
- **Input Validation**: Ready for implementation

## 🧪 Testing

The project is set up to support testing. You can add your preferred testing framework like Jest or Mocha.

## 📝 Code Style

- **ESLint**: Enforces consistent code style
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Can be added for code formatting

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables

3. Start the server:
```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

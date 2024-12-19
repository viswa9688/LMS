# Modern LMS

A modern Learning Management System built with React, Node.js, and MongoDB.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account (free tier is sufficient)

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" on your cluster
5. Add your IP address to the IP whitelist
6. Create a database user
7. Choose "Connect your application"
8. Copy the connection string
9. Replace the placeholder values in the connection string:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `modern-lms`

### Environment Setup

1. Create a `.env` file in the root directory
2. Add your MongoDB connection string and other variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend server at http://localhost:5173
- Backend server at http://localhost:5000

## Development

The development command (`npm run dev`) starts both frontend and backend servers concurrently:

- Frontend (Vite) server runs on port 5173
- Backend (Express) server runs on port 5000

## Project Structure

```
.
├── server/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── utils/         # Utility functions
│   └── index.ts       # Server entry point
└── src/               # Frontend React application
```

## Available Scripts

- `npm run dev` - Start both frontend and backend development servers
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the backend development server
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import textRoutes from './routes/text.route.js';
import errorMiddleware from './middlewares/error.middleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api', textRoutes);

// Global error handling middleware (must be last)
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

/**
 * Global error handling middleware
 * Handles all errors and returns appropriate HTTP responses
 */
const errorMiddleware = (err, req, res, next) => {
  // Log error for debugging (in production, use proper logging service)
  console.error('Error:', err);

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle known error types
  if (err.message) {
    message = err.message;

    // Set appropriate status codes based on error message
    if (err.message.includes('required') || err.message.includes('Validation')) {
      statusCode = 400;
    } else if (err.message.includes('API key') || err.message.includes('invalid')) {
      statusCode = 401;
    } else if (err.message.includes('rate limit') || err.message.includes('quota')) {
      statusCode = 429;
    } else if (err.message.includes('exceeds maximum')) {
      statusCode = 400;
    }
  }

  // Handle OpenRouter API errors
  if (err.response) {
    const apiError = err.response;
    if (apiError.status === 401) {
      statusCode = 401;
      message = 'OpenRouter API key is invalid or missing';
    } else if (apiError.status === 429) {
      statusCode = 429;
      message = 'OpenRouter API rate limit exceeded. Please try again later.';
    } else if (apiError.status === 402) {
      statusCode = 402;
      message = 'OpenRouter API quota exceeded. Please check your account.';
    } else if (apiError.status === 500 || apiError.status === 503) {
      statusCode = 503;
      message = 'OpenRouter service is temporarily unavailable. Please try again later.';
    }
  }

  // Send error response
  res.status(statusCode).json({
    error: 'Error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorMiddleware;

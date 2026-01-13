# AI Text Backend

Production-ready Node.js backend for fixing and improving text using OpenRouter API.

## Features

- ✅ Fix grammar, spelling, and punctuation
- ✅ Improve text quality while maintaining original meaning
- ✅ Support for multiple tones: professional, friendly, casual, formal
- ✅ Input validation and error handling
- ✅ Health check endpoint
- ✅ CORS enabled for cross-origin requests

## Tech Stack

- Node.js (v18+)
- Express.js
- ES Modules
- OpenRouter API
- axios (for HTTP requests)
- dotenv
- cors

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional: For tracking (used in API headers)
APP_URL=http://localhost:3000
APP_NAME=AI Text Backend
```

   Get your OpenRouter API key from: https://openrouter.ai/keys

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### Fix Text
```
POST /api/fix-text
```

Request body:
```json
{
  "text": "your text here",
  "tone": "professional"
}
```

Response:
```json
{
  "result": "improved text here"
}
```

**Tone options:**
- `professional` (default) - Formal, business-appropriate
- `friendly` - Warm, approachable, conversational
- `casual` - Relaxed, informal
- `formal` - Very formal, academic, precise

**Limitations:**
- Maximum text length: 2000 characters
- Maximum tokens: 200

## Error Handling

The API returns appropriate HTTP status codes:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid API key)
- `402` - Payment Required (quota exceeded)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error
- `503` - Service Unavailable (OpenRouter service down)

Error response format:
```json
{
  "error": "Error",
  "message": "Error description"
}
```

## Project Structure

```
src/
├── app.js                 # Express app setup
├── config/
│   └── openrouter.config.js  # OpenRouter client configuration
├── routes/
│   └── text.route.js     # Text routes
├── services/
│   └── text.service.js   # Text processing service
└── middlewares/
    └── error.middleware.js # Error handling middleware
```

## Security

- OpenRouter API key is stored in environment variables (never commit `.env` to version control)
- Input validation prevents malicious payloads
- Maximum text length limit prevents abuse
- CORS enabled for cross-origin requests

## Model Configuration

The default model used is `openai/gpt-3.5-turbo`. You can change this in `src/config/openrouter.config.js` to use any model supported by OpenRouter.

## License

ISC

import { OpenRouter } from '@openrouter/sdk';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set in environment variables');
}

const API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Initialize OpenRouter SDK client
 */
const openRouterClient = new OpenRouter({
  apiKey: API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000', // Optional: for tracking
    'X-Title': process.env.APP_NAME || 'AI Text Backend' // Optional: for tracking
  }
});

/**
 * OpenRouter API client wrapper
 */
const openrouter = {
  /**
   * Generate text completion using OpenRouter API
   * @param {Object} options - Completion options
   * @param {string} options.systemMessage - System message/prompt
   * @param {string} options.userMessage - User message/text
   * @param {number} options.maxTokens - Maximum tokens to generate
   * @returns {Promise<string>} - Generated text
   */
  async generateCompletion({ systemMessage, userMessage, maxTokens = 200 }) {
    try {
      const messages = [
        {
          role: 'system',
          content: systemMessage
        },
        {
          role: 'user',
          content: userMessage
        }
      ];

      const response = await openRouterClient.chat.send({
        model: 'openai/gpt-3.5-turbo', // Default model, can be changed
        messages: messages,
        max_tokens: maxTokens,
        temperature: 0.7,
        stream: false
      });

      const generatedText = response.choices?.[0]?.message?.content?.trim();

      if (!generatedText) {
        throw new Error('No response received from OpenRouter API');
      }

      return generatedText;
    } catch (error) {
      // Handle OpenRouter SDK errors
      if (error.status) {
        const status = error.status;

        if (status === 401) {
          throw new Error('OpenRouter API key is invalid or missing');
        } else if (status === 429) {
          throw new Error('OpenRouter API rate limit exceeded. Please try again later.');
        } else if (status === 402) {
          throw new Error('OpenRouter API quota exceeded. Please check your account.');
        } else if (status >= 500) {
          throw new Error('OpenRouter service is temporarily unavailable. Please try again later.');
        }

        throw new Error(error.message || `OpenRouter API error: ${status}`);
      }

      // Handle other error types
      if (error.message) {
        if (error.message.includes('API key') || error.message.includes('401')) {
          throw new Error('OpenRouter API key is invalid or missing');
        }
        if (error.message.includes('rate limit') || error.message.includes('429')) {
          throw new Error('OpenRouter API rate limit exceeded. Please try again later.');
        }
        if (error.message.includes('quota') || error.message.includes('402')) {
          throw new Error('OpenRouter API quota exceeded. Please check your account.');
        }
      }

      throw new Error(error.message || 'An unexpected error occurred while processing the request');
    }
  }
};

export default openrouter;

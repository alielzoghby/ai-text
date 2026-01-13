import openrouter from '../config/openrouter.config.js';

const MAX_TEXT_LENGTH = 2000;
const MAX_TOKENS = 200;

/**
 * Validates the tone parameter
 * @param {string} tone - The tone to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidTone = (tone) => {
  const validTones = ['professional', 'friendly', 'casual', 'formal'];
  return validTones.includes(tone);
};

/**
 * Generates a system message based on the tone
 * @param {string} tone - The desired tone
 * @returns {string} - The system message
 */
const getSystemMessage = (tone) => {
  const toneInstructions = {
    professional: 'You are a professional assistant that improves text. Use a formal, business-appropriate tone. Maintain clarity and precision.',
    friendly: 'You are a friendly assistant that improves text. Use a warm, approachable, and conversational tone. Be helpful and engaging.',
    casual: 'You are a casual assistant that improves text. Use a relaxed, informal tone. Keep it natural and easy-going.',
    formal: 'You are a formal assistant that improves text. Use a very formal, academic, and precise tone. Maintain strict grammar and structure.'
  };

  const baseMessage = 'You are a professional assistant that improves text. Your task is to fix grammar, spelling, punctuation, and improve the overall quality of the given text while maintaining the original meaning.';
  const toneMessage = toneInstructions[tone] || toneInstructions.professional;

  return `${toneMessage} Return only the improved text without any explanations or additional commentary.`;
};

/**
 * Fixes and improves text using OpenRouter API
 * @param {string} text - The text to fix and improve
 * @param {string} tone - The desired tone (professional | friendly | casual | formal)
 * @returns {Promise<string>} - The improved text
 * @throws {Error} - If validation fails or OpenRouter API call fails
 */
const fixText = async (text, tone = 'professional') => {
  // Validation
  if (!text || typeof text !== 'string') {
    throw new Error('Text is required and must be a string');
  }

  if (text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  if (text.length > MAX_TEXT_LENGTH) {
    throw new Error(`Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters`);
  }

  if (!isValidTone(tone)) {
    throw new Error(`Invalid tone. Must be one of: professional, friendly, casual, formal`);
  }

  try {
    const systemMessage = getSystemMessage(tone);

    const improvedText = await openrouter.generateCompletion({
      systemMessage,
      userMessage: text,
      maxTokens: MAX_TOKENS
    });

    return improvedText;
  } catch (error) {
    // Re-throw OpenRouter errors (they're already formatted)
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while processing the text');
  }
};

export default {
  fixText,
  MAX_TEXT_LENGTH
};

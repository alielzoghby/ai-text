import express from 'express';
import textService from '../services/text.service.js';

const router = express.Router();

/**
 * POST /api/fix-text
 * Fixes and improves text using OpenRouter API
 */
router.post('/fix-text', async (req, res, next) => {
  try {
    const { text, tone } = req.body;

    // Validation
    if (!text) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Text field is required'
      });
    }

    if (typeof text !== 'string') {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Text must be a string'
      });
    }

    if (text.trim().length === 0) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Text cannot be empty'
      });
    }

    if (text.length > textService.MAX_TEXT_LENGTH) {
      return res.status(400).json({
        error: 'Validation error',
        message: `Text exceeds maximum length of ${textService.MAX_TEXT_LENGTH} characters`
      });
    }

    // Default tone to professional if not provided
    const selectedTone = tone || 'professional';

    // Call service to fix text
    const result = await textService.fixText(text, selectedTone);

    res.status(200).json({
      result
    });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

export default router;

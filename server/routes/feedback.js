const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Feedback = require('../models/Feedback');

// POST /api/feedback - Create new feedback
router.post('/', [
  body('name').notEmpty().withMessage('Name is required').trim().isLength({ max: 100 }),
  body('email').optional().isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  body('message').notEmpty().withMessage('Message is required').trim().isLength({ max: 500 }),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message, rating } = req.body;
    
    const feedback = new Feedback({
      name,
      email,
      message,
      rating
    });

    await feedback.save();
    
    console.log('New feedback created:', feedback);
    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting feedback'
    });
  }
});

// GET /api/feedback - Get all feedback
router.get('/', async (req, res) => {
  try {
    const { rating } = req.query;
    let filter = {};
    
    if (rating) {
      const ratings = rating.split(',').map(r => parseInt(r.trim()));
      filter.rating = { $in: ratings };
    }

    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
    
    console.log(`Fetched ${feedbacks.length} feedbacks`);
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching feedbacks'
    });
  }
});

// GET /api/stats - Get feedback statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          positiveCount: {
            $sum: { $cond: [{ $gte: ['$rating', 4] }, 1, 0] }
          },
          negativeCount: {
            $sum: { $cond: [{ $lte: ['$rating', 2] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      total: 0,
      averageRating: 0,
      positiveCount: 0,
      negativeCount: 0
    };

    // Round average rating to 2 decimal places
    result.averageRating = Math.round(result.averageRating * 100) / 100;
    
    console.log('Stats fetched:', result);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

// DELETE /api/feedback - Delete all feedback (for testing)
router.delete('/', async (req, res) => {
  try {
    const result = await Feedback.deleteMany({});
    console.log(`Deleted ${result.deletedCount} feedback entries`);
    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} feedback entries`
    });
  } catch (error) {
    console.error('Error deleting feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting feedbacks'
    });
  }
});

module.exports = router;

const { body, param } = require('express-validator');

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('age').optional().isInt({ min: 18 }).withMessage('Age must be 18 or above')
];

exports.updateUserValidation = [
  body('name').optional().notEmpty(),
  body('email').optional().isEmail(),
  body('password').optional().isLength({ min: 8 }),
  body('age').optional().isInt({ min: 18 })
];

exports.idValidation = [
  param('id').isUUID().withMessage('Invalid user ID')
];

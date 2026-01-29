const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const validation = require('../validations/user.validation');

router.post('/', validation.createUserValidation, controller.createUser);
router.get('/', controller.getUsers);
router.get('/:id', validation.idValidation, controller.getUserById);
router.put('/:id', validation.idValidation, validation.updateUserValidation, controller.updateUser);
router.delete('/:id', validation.idValidation, controller.deleteUser);

module.exports = router;

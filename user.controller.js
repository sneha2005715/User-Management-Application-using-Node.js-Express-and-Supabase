const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const userService = require('../services/user.service');

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password, age, role } = req.body;

    const existing = await userService.findUserByEmail(email);
    if (existing.data)
      return res.status(409).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      age,
      role
    });

    if (error) throw error;

    res.status(201).json({ message: 'User created successfully', user: data });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { data, error } = await userService.getAllUsers();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await userService.getUserById(id);
    if (error || !data)
      return res.status(404).json({ message: 'User not found' });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.password)
      updateData.password = await bcrypt.hash(updateData.password, 10);

    const { data, error } = await userService.updateUser(id, updateData);
    if (error || !data)
      return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user: data });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await userService.deleteUser(id);
    if (error)
      return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

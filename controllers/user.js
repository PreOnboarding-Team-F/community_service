import * as userService from '../services/user.js';

export const createUser = async (req, res) => {
  await userService.createUser(req.body);
  res.status(201).json({ message: 'REGISTER SUCCESS' });
};

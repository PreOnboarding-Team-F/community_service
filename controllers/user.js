import * as userService from '../services/user.js';

export const createUser = async (req, res) => {
  await userService.createUser(req.body);
  res.status(201).json({ message: 'REGISTER SUCCESS' });
};

export const login = async (req, res) => {
  const { id, password } = req.body;
  const result = await userService.login(id, password);
  res.status(200).json({ result });
};

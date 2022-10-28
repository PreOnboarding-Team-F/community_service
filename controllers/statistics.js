import * as statisticsService from '../services/statistics.js';

export const getGender = async function (req, res) {
  const data = await statisticsService.readAllUserGender();

  res.status(200).json({ data });
};

export const getAge = async function (req, res) {
  const data = await statisticsService.readAllUserAge();

  res.status(200).json({ data });
};

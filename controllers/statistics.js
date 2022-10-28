import * as statisticsService from '../services/statistics.js';

export const getGender = async function (req, res) {
  const data = await statisticsService.readAllUserGender();

  res.status(200).json({ data });
};

export const getAge = async function (req, res) {
  const data = await statisticsService.readAllUserAge();

  res.status(200).json({ data });
};

export const getAccesstime = async function (req, res) {
  const data = await statisticsService.getAccesstime();

  res.status(200).json({ data });
};

export const getVisit = async function (req, res) {
  const data = await statisticsService.getVisit();

  res.status(200).json({ data });
};

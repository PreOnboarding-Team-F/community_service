import * as statisticsRepository from '../models/statistics.js';

export const readAllUserGender = async () => {
  let result = {
    boardWriterRatio: {
      female: 0,
      male: 0,
    },
    genderCount: {
      female: 0,
      male: 0,
      total: 0,
    },
    genderRatio: {
      female: 0,
      male: 0,
    },
  };
  let boardWriterMale = 0;
  let boardWriterFemale = 0;
  let userMale = 0;
  let userFemale = 0;

  const promise1 = statisticsRepository.readAllUserGender();
  const promise2 = statisticsRepository.readAllUserGenderByBoard();
  const [userGender, userGenderByBoard] = await Promise.all([
    promise1,
    promise2,
  ]);

  for (const iterator of userGender) {
    if (iterator.gender === 'male') {
      userMale = iterator._count.gender;
    } else if (iterator.gender === 'female') {
      userFemale = iterator._count.gender;
    } else {
      console.log(iterator.gender);
    }
  }

  for (const iterator of userGenderByBoard) {
    if (iterator.gender === 'male') {
      boardWriterMale = Number(iterator.genderCount);
    } else if (iterator.gender === 'female') {
      boardWriterFemale = Number(iterator.genderCount);
    } else {
      console.log(iterator.gender);
    }
  }

  result.boardWriterRatio.male = makeRatio(
    boardWriterMale,
    boardWriterMale + boardWriterFemale
  );
  result.boardWriterRatio.female = makeRatio(
    boardWriterFemale,
    boardWriterMale + boardWriterFemale
  );
  result.genderCount.female = userFemale;
  result.genderCount.male = userMale;
  result.genderCount.total = userFemale + userMale;
  result.genderRatio.female = makeRatio(userFemale, result.genderCount.total);
  result.genderRatio.male = makeRatio(userMale, result.genderCount.total);

  return result;
};

export const readAllUserAge = async () => {
  let result = {};

  const promise1 = await statisticsRepository.readAllUserAge();
  const promise2 = statisticsRepository.readAllUserAgeByBoard();
  const [userAge, userAgeByBoard] = await Promise.all([promise1, promise2]);
  const userAgeRatioList = new Array(10).fill(0);
  const userAgeByBoardRatioList = new Array(10).fill(0);
  const userAgeByBoardCountList = new Array(10).fill(0);
  const userAgeCountList = new Array(10).fill(0);
  const userAgeByBoardTotal = userAgeByBoard.length;
  const userAgeTotal = userAge.length;

  for (const iterator of userAgeByBoard) {
    userAgeByBoardCountList[Math.floor(iterator.age / 10)] += 1;
  }
  for (let idx = 0; idx < userAgeByBoardRatioList.length; idx++) {
    userAgeByBoardRatioList[idx] = makeRatio(
      userAgeByBoardCountList[idx],
      userAgeByBoardTotal
    );
  }
  for (const iterator of userAge) {
    userAgeCountList[Math.floor(iterator.age / 10)] += 1;
  }
  for (let idx = 0; idx < userAgeRatioList.length; idx++) {
    userAgeRatioList[idx] = makeRatio(userAgeCountList[idx], userAgeTotal);
  }

  result.boardWriterRatio = userAgeByBoardRatioList;
  result.userCount = userAgeCountList;
  result.userRatio = userAgeRatioList;

  return result;
};

function makeRatio(num, total) {
  const swap = Math.round((num / total) * 10000);
  return swap / 100;
}

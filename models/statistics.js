import prismaClient from './prismaClient.js';

export const readAllUserGender = async () => {
  const data = prismaClient.user.groupBy({
    by: ['gender'],
    _count: {
      gender: true,
    },
  });
  return data;
};

export const readAllUserGenderByBoard = async () => {
  const data = prismaClient.$queryRaw`
    SELECT COUNT(*) AS genderCount, user.gender
    FROM board JOIN user ON board.user_id = user.id
    WHERE board.board_type = "free"
    GROUP BY  user.gender`;

  return data;
};

export const readAllUserAge = async () => {
  const data = prismaClient.$queryRaw`
    SELECT YEAR(NOW())-LEFT(user.birth,4) +1 AS age
    FROM user`;
  return data;
};

export const readAllUserAgeByBoard = async () => {
  const data = prismaClient.$queryRaw`
    SELECT YEAR(NOW())-LEFT(user.birth,4) +1 AS age
    FROM board JOIN user ON board.user_id = user.id
    WHERE board.board_type = "free"`;
  return data;
};

export const readAllUserByAccessTime = async () => {
  const data = prismaClient.$queryRaw`
    SELECT MID(v.visited_at,12,2) AS visited, YEAR(NOW())-LEFT(user.birth,4) +1 AS age, user.gender
    FROM user JOIN visit_log v ON v.user_id = user.id;`;
  return data;
};

export const readAllUserByVisit = async () => {
  const data = prismaClient.$queryRaw`
    SELECT YEAR(NOW())-LEFT(user.birth,4) +1 AS age, user.gender
    FROM user JOIN visit_log v ON v.user_id = user.id;`;
  return data;
};

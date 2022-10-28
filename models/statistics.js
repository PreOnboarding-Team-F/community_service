import prismaClient from './prismaClient.js';
/**
 * 전체 유저의 성별 Count를 반환
 * @returns
 */
export const readAllUserGender = async () => {
  const data = prismaClient.user.groupBy({
    by: ['gender'],
    _count: {
      gender: true,
    },
  });
  return data;
};
/**
 * 자유게시판 작성한 유저의 성별 Count를 반환
 */
export const readAllUserGenderByBoard = async () => {
  const data = prismaClient.$queryRaw`
    SELECT COUNT(*) AS genderCount, user.gender
    FROM board JOIN user ON board.user_id = user.id
    WHERE board.board_type = "free"
    GROUP BY  user.gender`;

  return data;
};
/**
 * 전체 유저의 나이를 반환
 */
export const readAllUserAge = async () => {
  const data = prismaClient.$queryRaw`
    SELECT YEAR(NOW())-LEFT(user.birth,4) +1 AS age
    FROM user`;
  return data;
};
/**
 * 자유게시판 작성한 유저의 나이를 반환
 */
export const readAllUserAgeByBoard = async () => {
  const data = prismaClient.$queryRaw`
    SELECT YEAR(NOW())-LEFT(user.birth,4) +1 AS age
    FROM board JOIN user ON board.user_id = user.id
    WHERE board.board_type = "free"`;
  return data;
};
/**
 * 모든 유저의 visit_log table 기준 방문시간, 나이, 성별 반환
 */
export const readAllUserByAccessTime = async () => {
  const data = prismaClient.$queryRaw`
    SELECT MID(v.visited_at,12,2) AS visited, YEAR(NOW())-LEFT(user.birth,4) +1 AS age, user.gender
    FROM user JOIN visit_log v ON v.user_id = user.id;`;
  return data;
};
/**
 * 모든 유저의 visit_log table 기준 나이, 성별 반환
 */
export const readAllUserByVisit = async () => {
  const data = prismaClient.$queryRaw`
    SELECT YEAR(NOW())-LEFT(user.birth,4) +1 AS age, user.gender
    FROM user JOIN visit_log v ON v.user_id = user.id;`;
  return data;
};

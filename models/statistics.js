import prismaClient from './prismaClient.js';

export const readAllUserGender = async () => {
    const data =  prismaClient.user.groupBy({
        by:['gender'],
        _count:{
            gender:true
        }
    })
    return data;
};

export const readAllUserGenderByBoard = async () => {
    const data = prismaClient.$queryRaw`
    SELECT COUNT(*) AS genderCount, user.gender
    FROM board JOIN user ON board.user_id = user.id
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
    FROM board JOIN user ON board.user_id = user.id`;
  return data;
};
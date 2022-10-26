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
    const data = await prismaClient.$queryRaw`
    SELECT COUNT(*) AS genderCount, user.gender
    FROM board JOIN user ON board.user_id = user.id
    GROUP BY  user.gender
  `;

  return data;
};



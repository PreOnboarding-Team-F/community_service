import * as statisticsRepository from "../models/statistics.js"


export const readAllUserGender = async () => {
    let result = {
        boardWriterRatio:{
            female: 0,
            male: 0
        },
        genderCount:{
            female: 0,
            male: 0,
            total: 0
        },
        genderRatio:{
            female: 0,
            male: 0
        }
    };
    let boardWriterMale = 0;
    let boardWriterFemale = 0;
    let userMale = 0;
    let userFemale = 0;
    
    const promise1 = statisticsRepository.readAllUserGender();
    const promise2 = statisticsRepository.readAllUserGenderByBoard();
    const [userGender,userGenderByBoard] =  await Promise.all([promise1,promise2]);
    
    for (const iterator of userGender) {
        if (iterator.gender === "male"){
            userMale =iterator._count.gender
        }
        else if (iterator.gender === "female"){
            userFemale = iterator._count.gender
        }
        else{
            console.log(iterator.gender);
        }
    }

    for (const iterator of userGenderByBoard) {
        if (iterator.gender === "male"){
            boardWriterMale = Number(iterator.genderCount);
        }
        else if (iterator.gender === "female"){
            boardWriterFemale = Number(iterator.genderCount);
        }
        else{
            console.log(iterator.gender);
        }
    }

    result.boardWriterRatio.male = Math.ceil((boardWriterMale / (boardWriterMale+boardWriterFemale))*100);
    result.boardWriterRatio.female = 100 - result.boardWriterRatio.male;
    result.genderCount.female = userFemale;
    result.genderCount.male = userMale;
    result.genderCount.total = userFemale+userMale;
    result.genderRatio.female = Math.ceil((userFemale/result.genderCount.total)*100);
    result.genderRatio.male = 100 - result.genderRatio.female;

    return result;

};
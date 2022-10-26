import * as statisticsService from "../services/statistics.js"

export const getGender = async function (req, res) {
    const data = await statisticsService.readAllUserGender();
    
    res.status(200).json({data});
}
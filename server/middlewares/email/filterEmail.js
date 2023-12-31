const sequelize = require('../../../dbconfig.js');
const Requests = require('../../models/requestModel.js');
const { Op } = require('sequelize');

const filterRequests = async (filters) => {
    const whereClause = {};

    if (filters.isNew !== undefined) {
        whereClause.isNew = filters.isNew === 'true' ? true : false;
    }

    const allAppartaments = await Requests.findAll({
        where: whereClause,
    });

    return allAppartaments;
}

module.exports = filterRequests;
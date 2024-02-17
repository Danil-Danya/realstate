const sequelize = require('../../../dbconfig.js');
const Requests = require('../../models/requestModel.js');
const { Op } = require('sequelize');

const filterRequests = async (filters) => {
    const whereClause = {};

    if (filters.isNew !== undefined) {
        whereClause.isNew = filters.isNew === 'true' ? true : false;
    }

    const allRequsts = await Requests.findAll({
        where: whereClause,
    });

    if (filters.nameFilter) {
        whereClause.name = {
            [Op.like]: `%${filters.nameFilter}%`
        }
    }

    console.log(filters);

    const filterParametrs = {
        where: whereClause,
        limit: filters.limit,
        order: [['name', 'ASC']],
        collate: 'utf8mb4_general_ci'
    }

    const orderOptions = whereClause.name ? [['name', 'ASC']] : [['name']];

    if (whereClause.name) {
        filterParametrs.order = [['name', 'ASC']];

        const allRequsts = await Requests.findAll({
            where: whereClause,
            order: orderOptions,
            collate: 'utf8mb4_general_ci'
        });

        console.log(allRequsts);

        return allRequsts;
    }

    return allRequsts;
}

module.exports = filterRequests;
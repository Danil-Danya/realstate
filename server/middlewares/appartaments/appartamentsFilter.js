const sequelize = require('../../../dbconfig.js');
const Appartaments = require('../../models/appartamentModel.js');
const { Op } = require('sequelize');

const filterAppartaments = async (filters) => {
    const whereClause = {};

    if (filters.addres !== undefined) {
        whereClause.addres = { [Op.like]: `%${filters.addres}%` };
    }

    if (filters.timeOfCreate !== undefined) {
        whereClause.timeOfCreate = { [Op.like]: `%${filters.timeOfCreate}%` };
    }

    if (filters.propertyType !== undefined) {
        whereClause.propertyType = { [Op.like]: `%${filters.propertyType}%` };
    }

    if (filters.baths !== undefined) {
        whereClause.baths = { [Op.gte]: parseInt(filters.baths) };но
    }

    if (filters.beds !== undefined) {
        whereClause.beds = { [Op.gte]: parseInt(filters.beds) };
    }

    if (filters.square !== undefined) {
        whereClause.square = { [Op.gte]: parseInt(filters.square) };
    }

    if (filters.isActive !== undefined) {
        whereClause.isActive = filters.isActive === 'true' ? true : false;
    }

    if (filters.isDraft !== undefined) {
        whereClause.isDraft = filters.isDraft === 'true' ? true : false;
    }

    if (filters.isSlide !== undefined) {
        whereClause.isSlide = filters.isSlide === 'true' ? true : false;
    }
    
    if (filters.firstSlide !== undefined) {
        whereClause.firstSlide = filters.firstSlide === 'true' ? true : false;
    }

    const allAppartaments = await Appartaments.findAll({
        where: whereClause,
        limit: filters.limit
    });

    console.log(filters.limit);

    return allAppartaments;
}

module.exports = filterAppartaments;
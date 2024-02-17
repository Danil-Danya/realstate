const sequelize = require('../../../dbconfig.js');
const Appartaments = require('../../models/appartamentModel.js');
const { Op } = require('sequelize');

const filterAppartaments = async (filters) => {
    let whereClause = {};

    if (filters.isActive !== undefined) {
        whereClause.isActive = filters.isActive === 'true' ? true : false;
    }

    if (filters.isDraft !== undefined) {
        whereClause.isDraft = filters.isDraft === 'true' ? true : false;
    }

    if (filters.isSlide !== undefined) {
        whereClause.isSlide = filters.isSlide === 'true' ? true : false;
    }

    

    if (filters.locations) {
        whereClause.addres = filters.locations;
    }
    
    if (filters.firstSlide !== undefined) {
        whereClause.firstSlide = filters.firstSlide === 'true' ? true : false;
    }

    if (filters.propertyType) {
        whereClause.propertyType = Array.isArray(filters.propertyType) ?
            { [Op.or]: filters.propertyType } :
            { [Op.or]: [filters.propertyType] };
    }

    if (filters.bedrooms != undefined) {
        whereClause.beds = filters.bedrooms;
    }

    if (filters.bathrooms != undefined) {
        whereClause.baths = filters.bathrooms;
    }

    if (filters.liked) {
        whereClause.name = {
            [Op.in]: filters.liked
        }
    }

    if (filters.combSelect === 'Rent') {
        if (filters.price != undefined) {
            whereClause.priceForRent = {
                [Op.between]: [filters.price.min, filters.price.max]
            }
        }
    }

    if (filters.areas) {
        whereClause.square = {
            [Op.gte]: filters.areas.min,
            [Op.lte]: filters.areas.max,
        }
    }

    if (filters.nameFilter) {
        whereClause.name = {
            [Op.like]: `%${filters.nameFilter}%`
        }
    }

    if (filters.combSelect !== undefined) {
        if (filters.combSelect === 'Rent') {
            whereClause.combSelect = { [Op.or]: ['Rent', 'Rent and buy'] };
        }
        if (filters.combSelect === 'Buy') {
            whereClause.combSelect = { [Op.or]: ['Buy', 'Rent and buy'] };
        }
    }

    const orderOptions = whereClause.name ? [['name', 'ASC']] : [['name']];

    let filterParametrs = {
        where: whereClause,
        limit: filters.limit,
        order: [['name', 'ASC']],
        collate: 'utf8mb4_general_ci'
    }

    if (whereClause.name) {
        filterParametrs.order = [['name', 'ASC']];

        const allAppartaments = await Appartaments.findAll({
            where: whereClause,
            limit: filters.limit,
            order: orderOptions,
            collate: 'utf8mb4_general_ci'
        });

        return allAppartaments;
    }

    if (filters.sort) {
        const sort = filters.sort;

        if (sort.price != undefined) {
            const orderField = (filters.combSelect === 'Rent') ? 'priceForRent' : 'priceForBuy';

            if (sort.price === 'Price (cheaper)') {
                const allAppartaments = await Appartaments.findAll({
                    where: whereClause,
                    limit: filters.limit,
                    order: [[orderField, 'ASC']],
                    collate: 'utf8mb4_general_ci'
                });
    
                return allAppartaments
            }

            if (sort.price === 'Price (expensive)') {
                const allAppartaments = await Appartaments.findAll({
                    where: whereClause,
                    limit: filters.limit,
                    order: [[orderField, 'DESC']],
                    collate: 'utf8mb4_general_ci'
                });
            }
        }

        if (sort.date != undefined) {
            if (sort.date === 'Date (new to old)') {
                const allAppartaments = await Appartaments.findAll({
                    where: whereClause,
                    limit: filters.limit,
                    order: [['createdAt', 'ASC']],
                    collate: 'utf8mb4_general_ci'
                });

                return allAppartaments
            }

            if (sort.date === 'Date (old to new)') {
                const allAppartaments = await Appartaments.findAll({
                    where: whereClause,
                    limit: filters.limit,
                    order: [['createdAt', 'DESC']],
                    collate: 'utf8mb4_general_ci'
                });

                return allAppartaments
            }
        } 

        if (sort.alphabet != undefined) {
            if (sort.alphabet === 'Alphabet (A-z)') {
                const allAppartaments = await Appartaments.findAll({
                    where: whereClause,
                    limit: filters.limit,
                    order: [['name', 'ASC']],
                    collate: 'utf8mb4_general_ci'
                });

                return allAppartaments
            }

            if (sort.alphabet === 'Alphabet (Z-a)') {
                const allAppartaments = await Appartaments.findAll({
                    where: whereClause,
                    limit: filters.limit,
                    order: [['name', 'DESC']],
                    collate: 'utf8mb4_general_ci'
                });

                return allAppartaments
            }
        }

        if (sort.lastUpdate != undefined) {
            if (sort.lastUpdate === 'Last update') {
                const allAppartaments = await Appartaments.findAll({
                    where: whereClause,
                    limit: filters.limit,
                    order: [['updatedAt', 'DESC']],
                    collate: 'utf8mb4_general_ci'
                });
    
                return allAppartaments
            }
        }
    }

    const allAppartaments = await Appartaments.findAll({
        where: whereClause,
        limit: filters.limit,
        collate: 'utf8mb4_general_ci'
    });
    
    return allAppartaments;
}

module.exports = filterAppartaments;
const { all } = require('axios');
const sequelize = require('../../../dbconfig.js');
const Posts = require('../../models/postModel.js'); 
const { Op } = require('sequelize');

const filterPosts = async (filters) => {
    const whereClause = {};

    if (filters.isActive !== undefined) {
        whereClause.isActive = filters.isActive === 'true' ? true : false;
    }

    if (filters.isDraft !== undefined) {
        whereClause.isDraft = filters.isDraft === 'true' ? true : false;
    }
    
    if (filters.nameFilter) {
        whereClause.title = {
            [Op.like]: `%${filters.nameFilter}%`
        }
    }

    if (filters.tags && filters.tags.length > 0) {
        whereClause.tags = {
            [Op.or]: filters.tags.map(tag => {
                return sequelize.where(
                    sequelize.fn('LOWER', sequelize.col('tags')),
                    'LIKE',
                    `%${tag.toLowerCase()}%`
                );
            })
        };
    }

    console.log(filters);

    const orderOptions = whereClause.name ? [['name', 'ASC']] : [['name']];

    const filterParametrs = {
        where: whereClause,
        limit: filters.limit,
        order: [['name', 'ASC']],
        collate: 'utf8mb4_general_ci'
    }

    if (whereClause.name) {
        filterParametrs.order = [['name', 'ASC']];

        allPosts = await Posts.findAll({
            where: whereClause,
            limit: filters.limit,
            order: orderOptions,
            collate: 'utf8mb4_general_ci'
        });

        return allPosts;
    }
    else {
        allPosts = await Posts.findAll({
            where: whereClause,
            limit: filters.limit,
            collate: 'utf8mb4_general_ci'
        });
        return allPosts;
    }
}

module.exports = filterPosts; 

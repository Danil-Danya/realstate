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
    
    const allPosts = await Posts.findAll({ 
        where: whereClause,
    });

    return allPosts;
}

module.exports = filterPosts; 

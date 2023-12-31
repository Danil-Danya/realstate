const Posts = require('../models/postModel');
const postUpload = require('../middlewares/post/uploadPost.js');
const postDelete = require('../middlewares/post/deletePost.js');
const postFilter = require('../middlewares/post/filterPost.js')
const uid = require('uid');

class Post {
    async createPost (req, res) {
        try {
            const postRequest = req.body;
            const imagesRequest = req.files;
            
            const postId = uid.uid();
            const title = postRequest.title;

            const imagesData = postUpload(imagesRequest, postId, title);
    
            postRequest.imgPaths = `${imagesData.imgPaths}`;
    
            for (let key in postRequest) {
                if (postRequest[key] === undefined) {
                    return res.status(400).json({ message: `You send an empty key: ${key}` });
                }
            }
    
            const createPost = await Posts.create(postRequest);
            return res.status(200).json(createPost);
        }
        catch (error) {
            console.log(error);
            res.status(503).json({ message: 'create post error' })
        }
    }

    async deletePost (req, res) {
        try {
            const { id, title, imgPaths } = req.body;
            console.log(id, title,imgPaths);
            if (!id || !title) return res.status(503).json("You send an ampty id or title");

            const deleted = postDelete(imgPaths);

            if (deleted) {
                const post =await Posts.destroy({ where: { id } });
                return res.status(200).json(post);
            }
            else {
                res.status(503).json({ message: 'Post delete error' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(503).json({message: 'Post delete error'});
        }
    }

    async editPost (req, res) {
        try {
            const postRequest = req.body;
            const { id, imgPaths } = req.body;
            const imagesRequest = req.files;
            const getItem = await Posts.findOne({ where: {id} });
            const deleteImages = [];
            const imgArray = imgPaths.split(',');
            
            let deleted = true;

            for (let i = 0; i < getItem.dataValues.imgPaths.length; i++) {
                for (let j = 0; j < imgArray.length; j++) {
                    if (getItem.dataValues.imgPaths[i] != imgArray[j]) {
                        deleteImages.push(getItem.dataValues.imgPaths[i]);
                    }
                }
            }

            deleted = !deleteImages ? postDelete(deleteImages) : true;
            console.log(deleteImages, getItem.dataValues.imgPaths, imgArray);

            deleted = deleteImages.length > 0 ? postDelete(deleteImages) : true;

            if (deleted) {
                const postId = uid.uid();
                const title = postRequest.title;
                const imagesData = postUpload(imagesRequest, postId, title);

                postRequest.imgPaths = imagesData.imgPaths.length > 0 ? `${imagesData.imgPaths}` : imgPaths;
    
                for (let key in postRequest) {
                    if (postRequest[key] === undefined) {
                        return res.status(400).json({ message: `You send an empty key: ${key}` });
                    }
                }
    
                const updatePost = await Posts.update(postRequest, { where: { id } });
                return res.status(200).json(updatePost);
            }
        }
        catch (error) {
            console.log(error);
            res.status(503).json({ message: 'update post error' })
        }
    }

    async getAllPost (req, res) {
        try {
            const filters = req.query;
            const allPosts = await postFilter(filters);

            return res.status(200).json(allPosts);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error get all posts' });
        }
    }

    async getOnePost (req, res) {
        try {
            const { id, title } = req.query;
            if (!id && !title) return res.status(400).json({ message: 'Id or title is empty' }); 

            const post = await Posts.findOne({ where: { title } });
            return res.status(200).json(post);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error get one posts' });
        }
    }
}

module.exports = new Post();
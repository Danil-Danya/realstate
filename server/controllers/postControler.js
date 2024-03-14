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

            const content = JSON.parse(postRequest.content);
            const imagesData = postUpload(imagesRequest, postId, title);
    
            postRequest.imgPaths = `${imagesData.imgPaths}`;
            console.log(postRequest.imgPaths);

            let index = 0;
            content.forEach((item, i) => {
                if (item.type === 'IMAGE') {
                    content[i].path = imagesData.imgPaths[index];
                    index++;
                }
            });

            postRequest.content = `${JSON.stringify(content)}`;
            const createPost = await Posts.create(postRequest);
            return res.status(200).json(createPost);
        }
        catch (error) {
            console.log(error);
            res.status(503).json({ message: 'create post error' })
        }
    }

    async updateViews(req, res) {
        try {
            const { id } = req.body;
            const post = await Posts.findOne({ where: { id } });

            if (post) {
                post.views++;

                const updatedPost = await post.save();
                return res.status(200).json(updatedPost);
            } else {
                return res.status(404).json({ error: 'Post not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }


    async deletePost (req, res) {
        try {
            const { id, title, content } = req.body;
            if (!id || !title) return res.status(503).json("You send an ampty id or title");
            
            const parseContent = JSON.parse(content);

            const imgPaths = parseContent.map((item) => {
                if (item.type === 'IMAGE') return item.paths;
            })

            console.log(imgPaths);

            const deleted = postDelete(imgPaths);

            if (deleted) {
                const post = await Posts.destroy({ where: { id } });
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
            const { id, imgPaths } = postRequest;
            const imagesRequest = req.files;
            const getItem = await Posts.findOne({ where: { id } });
            const imgArray = imgPaths.split(',');
            const postId = uid.uid();
            const title = postRequest.title;
            const imagesData = postUpload(imagesRequest, postId, title);

            postRequest.imgPaths = imagesData.imgPaths.length > 0 ? imagesData.imgPaths.join(',') : imgPaths;

            if (postRequest.content) {
                const content = JSON.parse(postRequest.content);
                let index = 0;

                content.forEach((item, i) => {
                    if (item.type === 'IMAGE') {
                        if (imagesData && imagesRequest) {
                            content[i].path = imagesData.imgPaths[index];
                            index++;
                        }
                    }
                });
                postRequest.content = JSON.stringify(content);
            }

            for (const key in postRequest) {
                if (postRequest[key] === undefined) {
                    return res.status(400).json({ message: `You send an empty key: ${key}` });
                }
            }

            const updatePost = await Posts.update(postRequest, { where: { id } });
            return res.status(200).json(updatePost);

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
const express = require('express');
const path = require('path');

const autorization = require('../controllers/authControler.js');
const appartaments = require('../controllers/appartamentController.js');
const request = require('../controllers/requestController.js');
const posts = require('../controllers/postControler.js');
const reviews = require('../controllers/reviewsController.js');

const router = express.Router();

router.post('/registration', autorization.registrationUser);
router.post('/indentification', autorization.indentificationUser);
router.post('/authification', autorization.autorizationUser);
router.get('/get-users', autorization.getUsers);
router.put('/edit-user-role', autorization.editRoleUser);
router.delete('/delete-users', autorization.deleteUsers);

router.post('/appartament-create', appartaments.createAppartament);
router.get('/appartament-get-all', appartaments.getAllAppartament);
router.get('/appartament-get-one', appartaments.getOneAppartament);
router.post('/appartament-update', appartaments.editAppartament)
router.delete('/appartament-delete', appartaments.deleteAppartament);

router.post('/request-create', request.createRequest);
router.get('/request-get-all', request.getAllRequest);
router.get('/request-get-one', request.getOneRequest);
router.delete('/request-delete', request.requestDelete);
router.put('/request-update', request.updateRequest);

router.post('/post-create', posts.createPost);
router.get('/post-get-all', posts.getAllPost);
router.get('/post-get-one', posts.getOnePost);
router.put('/post-update', posts.editPost);
router.put('/post-views', posts.updateViews);
router.delete('/post-delete', posts.deletePost);

router.get('/reviews-get-all', reviews.getReviews)

module.exports = router;
const { Router } = require('express');
const router = Router();
const Post = require('../models/Post')
const Tag = require('../models/Tag')
const User = require('../models/User')
const cache = require('../middlewares/cache.middleware')
const {
    validateId,
    validateIdParam,
    validateExists,
    validatePostBody
} = require('../middlewares/validaciones.middleware')

const {
    getPosts,
    getPostByID,
    createPost,
    updatePost,
    deletePost,
    addImageToPost,
    agregarTagAPost,
    getCommentsByPostId,
    getTagsByPostId,
    getUserByPostId
} = require('../controllers/post.controller');

router.get('/', cache(60), getPosts);
router.get('/:id', cache(60), validateId, validateExists(Post), getPostByID);

router.get('/:id/comments', validateId, validateExists(Post), getCommentsByPostId);
router.get('/:id/tags', validateId, validateExists(Post), getTagsByPostId);
router.get('/:id/user', validateId, validateExists(Post), getUserByPostId);

router.post('/', validatePostBody, validateExists(User, 'user'), createPost);
router.post('/create', validatePostBody, validateExists(User, 'user'), createPost);
router.post('/create/:userId', validateIdParam('userId'), validateExists(User, 'userId'), validatePostBody, createPost);
router.post('/create/:user_id', validateIdParam('user_id'), validateExists(User, 'user_id'), validatePostBody, createPost);

router.post('/:id/image', validateId, validateExists(Post), addImageToPost);

router.post('/:id/tag/:tagId', validateId, validateIdParam('tagId'), validateExists(Post), validateExists(Tag, 'tagId'), agregarTagAPost);
router.post('/:id/create-tag', validateId, validateExists(Post), agregarTagAPost);

router.put('/:id', validateId, validateExists(Post), validatePostBody, updatePost);
router.delete('/:id', validateId, validateExists(Post), deletePost);

module.exports = router;
const { Router } = require('express');
const router = Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const {
    validateId,
    validateExists,
    validateCommentBody
} = require('../middlewares/validaciones.middleware');

const { 
    getComments,      
    getCommentById,   
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment     
} = require('../controllers/comment.controller');

router.get('/', getComments);
router.post('/', validateCommentBody, validateExists(Post, 'post'), validateExists(User, 'user'), createComment);
router.post('/create', validateCommentBody, validateExists(Post, 'post'), validateExists(User, 'user'), createComment);
router.get('/post/:postId', getCommentsByPost);

router.get('/:id', validateId, validateExists(Comment), getCommentById);
router.put('/:id', validateId, validateExists(Comment), validateCommentBody, updateComment);
router.delete('/:id', validateId, validateExists(Comment), deleteComment);

module.exports = router;
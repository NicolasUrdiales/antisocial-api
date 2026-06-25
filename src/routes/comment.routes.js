// routes/comment.routes.js
const { Router } = require('express');
const router = Router();
const Comment = require('../models/Comment');
const { validateId, validateExists } = require('../middlewares/validaciones.middleware');

const { 
    getComments,      
    getCommentById,   
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment     
} = require('../controllers/comment.controller');


router.get('/', getComments);
router.post('/', createComment);
router.get('/post/:postId', getCommentsByPost);


router.get('/:id', validateId, validateExists(Comment), getCommentById);
router.put('/:id', validateId, validateExists(Comment), updateComment);
router.delete('/:id', validateId, validateExists(Comment), deleteComment);

module.exports = router;
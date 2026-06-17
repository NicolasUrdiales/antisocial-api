const { Router } = require('express');
const router = Router();
const {
    getPosts,
    getPostByID,
    createPost,
    updatePost,
    deletePost,
    addImageToPost,
    agregarTagAPost
} = require('../controllers/post.controller');

router.get('/', getPosts);
router.get('/:id', getPostByID);
router.post('/create', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

router.post('/:id/image', addImageToPost);
router.post('/:id/tag/:tagId', agregarTagAPost);

module.exports = router;
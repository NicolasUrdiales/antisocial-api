const { Router } = require('express');
const router = Router();
const {
    getPostImages,
    getPostImageById, 
    updatePostImage, 
    createPostImage,
    deletePostImage
} = require('../controllers/postImage.controller');

router.get('/', getPostImages);
router.get('/:id', getPostImageById);
router.post('/', createPostImage); 
router.put('/:id', updatePostImage);
router.delete('/:id', deletePostImage);

module.exports = router;
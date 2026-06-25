const { Router } = require('express');
const router = Router();
const Post = require('../models/Post')
const Tag = require('../models/Tag')
const cache = require('../middlewares/cache.middleware')
const {validateId, validateExists} = require('../middlewares/validaciones.middleware')



const {
    getPosts,
    getPostByID,
    createPost,
    updatePost,
    deletePost,
    addImageToPost,
    agregarTagAPost
} = require('../controllers/post.controller');




router.get('/', cache(60) ,getPosts);
router.get('/:id', cache(60) ,validateId, validateExists(Post), getPostByID);


router.post('/', createPost);
router.post('/:id/image', validateId, validateExists(Post), addImageToPost);
router.post('/:id/tag/:tagId',validateId, validateExists(Post),validateExists(Tag), agregarTagAPost);


router.put('/:id',validateId,validateExists(Post), updatePost);

router.delete('/:id',validateId, validateExists(Post), deletePost);


module.exports = router;
const { Router } = require('express');
const router = Router();
const Tag = require('../models/Tag');
const { validateId, validateExists } = require('../middlewares/validaciones.middleware');

const {
    getTags,
    getTagById,
    updateTag,
    createTag,
    deleteTag
} = require('../controllers/tag.controller');

router.get('/', getTags);
router.get('/:id', validateId, validateExists(Tag), getTagById);
router.post('/', createTag);
router.post('/create', createTag);
router.put('/:id', validateId, validateExists(Tag), updateTag);
router.delete('/:id', validateId, validateExists(Tag), deleteTag);

module.exports = router;
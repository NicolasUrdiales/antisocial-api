const { Router } = require('express');
const router = Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCommentsByUserId,
    getPostsByUserId,
    seguirUsuario
} = require('../controllers/user.controller');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.get('/:id/comments', getCommentsByUserId);
router.get('/:id/posts', getPostsByUserId);
router.post('/:id/follow/:idASeguir', seguirUsuario);

module.exports = router;
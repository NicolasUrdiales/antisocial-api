const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const {
    validateId,
    validateIdParam,
    validateExists,
    validateUserBody
} = require('../middlewares/validaciones.middleware');

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCommentsByUserId,
    getPostsByUserId,
    seguirUsuario,
    dejarSeguirUsuario,
    loginUsuario
} = require('../controllers/user.controller');

router.get('/', getUsers);
router.get('/:id', validateId, validateExists(User), getUserById);

router.post('/login', loginUsuario);
router.post('/', validateUserBody, createUser);
router.post('/create', validateUserBody, createUser);

router.put('/:id', validateId, validateExists(User), validateUserBody, updateUser);
router.delete('/:id', validateId, validateExists(User), deleteUser);

router.get('/:id/comments', validateId, validateExists(User), getCommentsByUserId);
router.get('/:id/posts', validateId, validateExists(User), getPostsByUserId);

router.post('/:id/seguir/:idASeguir', validateId, validateIdParam('idASeguir'), validateExists(User), validateExists(User, 'idASeguir'), seguirUsuario);
router.post('/:id/follow/:idASeguir', validateId, validateIdParam('idASeguir'), validateExists(User), validateExists(User, 'idASeguir'), seguirUsuario);

router.delete('/:id/unfollow/:idToUnfollow', validateId, validateIdParam('idToUnfollow'), validateExists(User), validateExists(User, 'idToUnfollow'), dejarSeguirUsuario);
router.delete('/:id/dejarSeguir/:idToUnfollow', validateId, validateIdParam('idToUnfollow'), validateExists(User), validateExists(User, 'idToUnfollow'), dejarSeguirUsuario);

module.exports = router;